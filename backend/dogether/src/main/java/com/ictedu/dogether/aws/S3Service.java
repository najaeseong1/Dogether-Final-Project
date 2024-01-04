package com.ictedu.dogether.aws;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.annotation.PostConstruct;
import java.net.MalformedURLException;
import java.net.URL;

@Service
@Slf4j
public class S3Service {
    // s3 버킷을 제어하는 객체
    private S3Client s3;

    @Value("${aws.credentials.accessKey}")
    private String accessKey;

    @Value("${aws.credentials.secretKey}")
    private String secretKey;

    @Value("${aws.region}")
    private String region;

    @Value("${aws.bucketName}")
    private String bucketName;

    // s3에 연결해서 인증을 처리하는 로직
    @PostConstruct // S3Service가 생성될 때 1번만 실행되는 아노테이션
    private void initializeAmazon() {
        // 액세스 키와 시크릿 키를 이용해서 계정 인증 받기
        AwsBasicCredentials credentials
                = AwsBasicCredentials.create(accessKey, secretKey);

        this.s3 = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();
    }

    /**
     * 버킷에 파일을 업로드하고, 업로드한 버킷의 url 정보를 리턴
     * @param uploadFile - 업로드 할 파일의 실제 raw 데이터
     * @param fileName - 업로드 할 파일명
     * @return - 버킷에 업로드 된 버킷 경로(url)
     */
    public String uploadToS3Bucket(byte[] uploadFile, String fileName) {
        log.info("\n\n\n uploadToS3Bucket(byte[] uploadFile, String fileName) 업로드 버킷 요청 들어옴");
        // 업로드 할 파일을 S3 오브젝트로 생성
        PutObjectRequest request
                = PutObjectRequest.builder()
                .bucket(bucketName) // 버킷 이름
                .key(fileName) // 파일명
                .build();

        log.info("\n\n\n uploadToS3Bucket 버킷 생성 완료 : {}",request);
        // 오브젝트를 버킷에 업로드(위에서 생성한 오브젝트, 업로드 하고자 하는 파일(바이트 배열)
        s3.putObject(request, RequestBody.fromBytes(uploadFile));

        String UploadFileUrl = s3.utilities()
                .getUrl(b -> b.bucket(bucketName).key(fileName))
                .toString();
        log.info("\n\n\n uploadToS3Bucket 버킷 저장 완료 및 리턴 : {}",UploadFileUrl);
        // 업로드 된 파일의 url을 반환
        return UploadFileUrl;
    }

    public byte[] downloadFromS3Bucket(String fileName) {
        log.info("\n\n\n downloadFromS3Bucket(String fileName) 다운로드 요청 들어옴 fileName === {}",fileName);
        // 다운로드 요청 들어옴 fileName === https://s3.ap-northeast-2.amazonaws.com/dogether.site/34f74421-44a7-4dab-a434-78bb377b64d5-map-marker-icon_34392%20%281%29.png
        // 이런식으로 들어와서 앞부분 dogether.site/ 까지 잘라야 할듯
        String fileRawName = extractKeyFromUrl(fileName);

        try {
            // S3에서 파일을 가져오는 요청 생성
            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileRawName)
                    .build();

            // S3 버킷에서 파일을 가져와서 바이트 배열로 반환
            ResponseBytes<GetObjectResponse> objectBytes = s3.getObjectAsBytes(getObjectRequest);
            byte[] data = objectBytes.asByteArray();

            log.info("\n\n\n S3 버킷에서 파일 다운로드 완료");

            return data;
        } catch (Exception e) {
            log.error("S3 버킷에서 파일을 다운로드하는 중 예외 발생: {}", e.getMessage());
            throw e; // 혹은 적절한 예외 처리를 여기서 진행
        }
    }

    public String extractKeyFromUrl(String fileUrl) {
        try {
            URL url = new URL(fileUrl);
            // URL에서 파일 경로를 얻어옵니다.
            String filePath = url.getPath();
            // 'dogether.site/' 문자열 이후의 부분을 추출합니다.
            String fileOriginName = filePath.substring(filePath.indexOf("dogether.site/") + "dogether.site/".length());
            log.info("\n\n\n extractKeyFromUrl에서 뽑아낸 fileOriginName === {}", fileOriginName);
            return fileOriginName;
        } catch (MalformedURLException e) {
            log.error("잘못된 URL 형식입니다: {}", fileUrl);
            throw new IllegalArgumentException("잘못된 URL 형식", e);
        }
    }


}


