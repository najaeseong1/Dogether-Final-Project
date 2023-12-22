// ApiService.java
package com.ictedu.dogether.adoptApi.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.adoptApi.Entity.Wish;
import com.ictedu.dogether.adoptApi.AdoptDto.response.AdoptListResponseDTO;
import com.ictedu.dogether.adoptApi.AdoptDto.response.AdoptResponseDTO;
import com.ictedu.dogether.adoptApi.WishDto.response.WishRegisterResponseDTO;
import com.ictedu.dogether.adoptApi.repository.AdoptRepository;
import com.ictedu.dogether.adoptApi.repository.WishRepository;
import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.userapi.entity.User;
import com.ictedu.dogether.userapi.repository.UserRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional

public class ApiService {

    @Value("${api.serviceKey}")
    private String apiKey;

    private final AdoptRepository adoptRepository;
    private final UserRepository userRepository;
    private final WishRepository wishRepository;

    //api 요청으로 데이터 DB에 넣기
    public AdoptListResponseDTO getAdoptList() throws IOException {
        int numOfRows = 100; // 페이지당 아이템 개수
        int totalItems = getTotalCodeItems(); // 전체 아이템 개수
        List<Adopt> adoptList = new ArrayList<>();

        try {
            int totalPages = (int) Math.ceil((double) totalItems / numOfRows);

            for (int pageNo = 1; pageNo <= totalPages; pageNo++) {
                StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic");
                urlBuilder.append("?" + "serviceKey" + "=" + apiKey);
                urlBuilder.append("&" + URLEncoder.encode("bgnde","UTF-8") + "=" + URLEncoder.encode("20231209", "UTF-8")); /*유기날짜(검색 시작일) (YYYYMMDD)*/
                urlBuilder.append("&" + URLEncoder.encode("endde","UTF-8") + "=" + URLEncoder.encode("20231219", "UTF-8")); /*유기날짜(검색 종료일) (YYYYMMDD)*/
                urlBuilder.append("&" + URLEncoder.encode("upkind","UTF-8") + "=" + URLEncoder.encode("417000", "UTF-8")); /*축종코드 (개 : 417000, 고양이 : 422400, 기타 : 429900)*/
                urlBuilder.append("&" + URLEncoder.encode("state","UTF-8") + "=" + URLEncoder.encode("protect", "UTF-8")); /*상태(전체 : null(빈값), 공고중 : notice, 보호중 : protect)*/
                urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode(String.valueOf(pageNo), "UTF-8")); /*페이지 번호 (기본값 : 1)*/
                urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8")); /*페이지당 보여줄 개수 (1,000 이하), 기본값 : 10*/
                urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*xml(기본값) 또는 json*/

                URL url = new URL(urlBuilder.toString());
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Content-type", "application/json");

                BufferedReader rd;
                if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                    rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                } else {
                    rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                }

                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = rd.readLine()) != null) {
                    sb.append(line);
                }
                //json 파싱 시작
                JsonParser parser = new JsonParser();

                JsonObject obj = parser.parse(sb.toString()).getAsJsonObject();

                JsonArray arr = null;
                try {
                    arr = obj.get("response").getAsJsonObject()
                            .get("body").getAsJsonObject()
                            .get("items").getAsJsonObject()
                            .get("item").getAsJsonArray();
                } catch (Exception e) {
                    log.info("null포인터 으아ㅓ아ㅓㅏ-{}", e.getMessage());
                }
                if (arr != null) {
                    for (JsonElement jsonElement : arr) {
                        JsonObject temp = jsonElement.getAsJsonObject();
                        Adopt save = adoptRepository.save(Adopt.builder()
                                .desertionNo(temp.get("desertionNo").getAsString() == null? "-" :temp.get("desertionNo").getAsString())
                                .kindCd(temp.get("kindCd").getAsString() == null? "-" : temp.get("kindCd").getAsString())
                                .gender(temp.get("sexCd").getAsString() == null? "-": temp.get("sexCd").getAsString())
                                .weight(temp.get("weight").getAsString() ==null? "-": temp.get("weight").getAsString())
                                .happenAddr(temp.get("happenPlace").getAsString() == null? "-":temp.get("happenPlace").getAsString())
                                .profileImg(temp.get("popfile").getAsString() == null? "-":temp.get("popfile").getAsString())
                                .neuterYn(temp.get("neuterYn").getAsString() == null? "-":temp.get("neuterYn").getAsString())
                                .age(temp.get("age").getAsString() == null? "-": temp.get("age").getAsString())
                                .colorCd(temp.get("colorCd").getAsString() == null? "-":temp.get("colorCd").getAsString())
                                .specialMark(temp.get("specialMark").getAsString() == null? "-":temp.get("specialMark").getAsString())
                                .careNm(temp.get("careNm").getAsString() == null? "-": temp.get("careNm").getAsString())
                                .careTel(temp.get("careTel").getAsString() == null? "-" : temp.get("careTel").getAsString())
                                .careAddr(temp.get("careAddr").getAsString() == null? "-": temp.get("careAddr").getAsString())
                                .orgNm(temp.get("orgNm").getAsString() == null? "-": temp.get("orgNm").getAsString())
                                .chargeNm(temp.get("chargeNm") == null ? "-" : temp.get("chargeNm").getAsString())
                                .officeTel(temp.get("officetel").getAsString() == null? "-": temp.get("officetel").getAsString())
                                .build());

                        adoptList.add(save);
                    }
                } else {
                    log.warn("API 응답에서 항목을 찾을 수 없습니다.");
                }

                rd.close();
                conn.disconnect();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<AdoptResponseDTO> adoptLists = adoptList.stream()
                .map(AdoptResponseDTO::new)
                .collect(Collectors.toList());

        return AdoptListResponseDTO.builder()
                .adoptLists(adoptLists)
                .build();
    }
    //반복문 돌릴 때 필요한 total 값 얻기 메서드
    private int getTotalCodeItems() throws IOException {
        log.info("getTotalItem 불러짐 ");
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic");
        urlBuilder.append("?" + "serviceKey" + "=" + apiKey);
        urlBuilder.append("&" + URLEncoder.encode("bgnde","UTF-8") + "=" + URLEncoder.encode("20231209", "UTF-8")); /*유기날짜(검색 시작일) (YYYYMMDD)*/
        urlBuilder.append("&" + URLEncoder.encode("endde","UTF-8") + "=" + URLEncoder.encode("20231217", "UTF-8")); /*유기날짜(검색 종료일) (YYYYMMDD)*/
        urlBuilder.append("&" + URLEncoder.encode("upkind","UTF-8") + "=" + URLEncoder.encode("417000", "UTF-8")); /*축종코드 (개 : 417000, 고양이 : 422400, 기타 : 429900)*/
        urlBuilder.append("&" + URLEncoder.encode("state","UTF-8") + "=" + URLEncoder.encode("protect", "UTF-8")); /*상태(전체 : null(빈값), 공고중 : notice, 보호중 : protect)*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode(String.valueOf(1), "UTF-8")); /*페이지 번호 (기본값 : 1)*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(String.valueOf(1000), "UTF-8")); /*페이지당 보여줄 개수 (1,000 이하), 기본값 : 10*/
        urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*xml(기본값) 또는 json*/


        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        log.info("parset 불러짐");
        JsonParser parser = new JsonParser();
        JsonObject obj = parser.parse(sb.toString()).getAsJsonObject();
        int totalCount = obj.get("response").getAsJsonObject()
                .get("body").getAsJsonObject()
                .get("totalCount").getAsInt();
        log.info("토탈 값 좀 나와라 아놔 -{}", totalCount);
        return totalCount;

    }

    //시도 코드에 따라 api 요청 보내기
    public AdoptListResponseDTO getAdminCodeList(String uprCd) throws IOException {
        int numOfRows = 100; // 페이지당 아이템 개수
        int totalItems = getTotalItems(); // 전체 아이템 개수
        List<Adopt> adoptList = new ArrayList<>();

        try {
            int totalPages = (int) Math.ceil((double) totalItems / numOfRows);

            for (int pageNo = 1; pageNo <= totalPages; pageNo++) {
                StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic");
                urlBuilder.append("?" + "serviceKey" + "=" + apiKey);
                urlBuilder.append("&" + URLEncoder.encode("bgnde","UTF-8") + "=" + URLEncoder.encode("20231209", "UTF-8")); /*유기날짜(검색 시작일) (YYYYMMDD)*/
                urlBuilder.append("&" + URLEncoder.encode("endde","UTF-8") + "=" + URLEncoder.encode("20231219", "UTF-8")); /*유기날짜(검색 종료일) (YYYYMMDD)*/
                urlBuilder.append("&" + URLEncoder.encode("upkind","UTF-8") + "=" + URLEncoder.encode("417000", "UTF-8")); /*축종코드 (개 : 417000, 고양이 : 422400, 기타 : 429900)*/
                urlBuilder.append("&" + URLEncoder.encode("upr_cd","UTF-8") + "=" + URLEncoder.encode(uprCd, "UTF-8")); /*시도코드 (시도 조회 OPEN API 참조)*/
                urlBuilder.append("&" + URLEncoder.encode("state","UTF-8") + "=" + URLEncoder.encode("protect", "UTF-8")); /*상태(전체 : null(빈값), 공고중 : notice, 보호중 : protect)*/
                urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode(String.valueOf(pageNo), "UTF-8")); /*페이지 번호 (기본값 : 1)*/
                urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(String.valueOf(numOfRows), "UTF-8")); /*페이지당 보여줄 개수 (1,000 이하), 기본값 : 10*/
                urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*xml(기본값) 또는 json*/

                URL url = new URL(urlBuilder.toString());
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Content-type", "application/json");

                BufferedReader rd;
                if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                    rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                } else {
                    rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                }

                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = rd.readLine()) != null) {
                    sb.append(line);
                }
                //json 파싱 시작
                JsonParser parser = new JsonParser();

                JsonObject obj = parser.parse(sb.toString()).getAsJsonObject();

                JsonArray arr = null;
                try {
                    arr = obj.get("response").getAsJsonObject()
                            .get("body").getAsJsonObject()
                            .get("items").getAsJsonObject()
                            .get("item").getAsJsonArray();
                } catch (Exception e) {
                    log.info("null포인터 으아ㅓ아ㅓㅏ-{}", e.getMessage());
                }
                if (arr != null) {
                    for (JsonElement jsonElement : arr) {
                        JsonObject temp = jsonElement.getAsJsonObject();
                        Adopt save = Adopt.builder()
                                .desertionNo(temp.get("desertionNo").getAsString() == null? "-" :temp.get("desertionNo").getAsString())
                                .kindCd(temp.get("kindCd").getAsString() == null? "-" : temp.get("kindCd").getAsString())
                                .gender(temp.get("sexCd").getAsString() == null? "-": temp.get("sexCd").getAsString())
                                .weight(temp.get("weight").getAsString() ==null? "-": temp.get("weight").getAsString())
                                .happenAddr(temp.get("happenPlace").getAsString() == null? "-":temp.get("happenPlace").getAsString())
                                .profileImg(temp.get("popfile").getAsString() == null? "-":temp.get("popfile").getAsString())
                                .neuterYn(temp.get("neuterYn").getAsString() == null? "-":temp.get("neuterYn").getAsString())
                                .age(temp.get("age").getAsString() == null? "-": temp.get("age").getAsString())
                                .colorCd(temp.get("colorCd").getAsString() == null? "-":temp.get("colorCd").getAsString())
                                .specialMark(temp.get("specialMark").getAsString() == null? "-":temp.get("specialMark").getAsString())
                                .careNm(temp.get("careNm").getAsString() == null? "-": temp.get("careNm").getAsString())
                                .careTel(temp.get("careTel").getAsString() == null? "-" : temp.get("careTel").getAsString())
                                .careAddr(temp.get("careAddr").getAsString() == null? "-": temp.get("careAddr").getAsString())
                                .orgNm(temp.get("orgNm").getAsString() == null? "-": temp.get("orgNm").getAsString())
                                .chargeNm(temp.get("chargeNm") == null ? "-" : temp.get("chargeNm").getAsString())
                                .officeTel(temp.get("officetel").getAsString() == null? "-": temp.get("officetel").getAsString())
                                .build();

                        adoptList.add(save);
                    }
                } else {
                    log.warn("API 응답에서 항목을 찾을 수 없습니다.");
                }

                rd.close();
                conn.disconnect();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<AdoptResponseDTO> adoptLists = adoptList.stream()
                .map(AdoptResponseDTO::new)
                .collect(Collectors.toList());

        return AdoptListResponseDTO.builder()
                .adoptLists(adoptLists)
                .build();
    }
    //반복문 돌릴 때 필요한 total 값 얻기 메서드
    private int getTotalItems() throws IOException {
        log.info("getTotalItem 불러짐 ");
        StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic");
        urlBuilder.append("?" + "serviceKey" + "=" + apiKey);
        urlBuilder.append("&" + URLEncoder.encode("bgnde","UTF-8") + "=" + URLEncoder.encode("20231117", "UTF-8")); /*유기날짜(검색 시작일) (YYYYMMDD)*/
        urlBuilder.append("&" + URLEncoder.encode("endde","UTF-8") + "=" + URLEncoder.encode("20231217", "UTF-8")); /*유기날짜(검색 종료일) (YYYYMMDD)*/
        urlBuilder.append("&" + URLEncoder.encode("upkind","UTF-8") + "=" + URLEncoder.encode("417000", "UTF-8")); /*축종코드 (개 : 417000, 고양이 : 422400, 기타 : 429900)*/
        urlBuilder.append("&" + URLEncoder.encode("state","UTF-8") + "=" + URLEncoder.encode("protect", "UTF-8")); /*상태(전체 : null(빈값), 공고중 : notice, 보호중 : protect)*/
        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode(String.valueOf(1), "UTF-8")); /*페이지 번호 (기본값 : 1)*/
        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode(String.valueOf(1000), "UTF-8")); /*페이지당 보여줄 개수 (1,000 이하), 기본값 : 10*/
        urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json", "UTF-8")); /*xml(기본값) 또는 json*/


        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");

        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        log.info("parset 불러짐");
        JsonParser parser = new JsonParser();
        JsonObject obj = parser.parse(sb.toString()).getAsJsonObject();
        int totalCount = obj.get("response").getAsJsonObject()
                .get("body").getAsJsonObject()
                .get("totalCount").getAsInt();
        log.info("토탈 값 좀 나와라 아놔 -{}", totalCount);
        return totalCount;

    }






    //분양게시물 상세조회
    public AdoptResponseDTO getDetailPage(String desertionNo) {
        Adopt targetPage = adoptRepository.findById(desertionNo).orElseThrow(
                () -> new RuntimeException("게시물 정보가 없습니다.")
        );

        return new AdoptResponseDTO(targetPage);

    }



    ////////////////////////////좋아요 ////////////////////////////////////

    //좋아요 등록하기
    public WishRegisterResponseDTO registWith(String desertionNo, TokenUserInfo userInfo) {
        //좋아요 누른 그 유저
        User targetUser = getUser(userInfo.getUserId());

        //좋아요 등록하려는 그 분양 게시물 정보
        Adopt adoptBoard = bringAdoptListBoard(desertionNo);

        //좋아요 등록하기
        Wish wishSave = wishRepository.save(
                Wish.builder()
                        .adopt(adoptBoard)
                        .user(targetUser)
                        .build()

        );

        return new WishRegisterResponseDTO(wishSave);

    }

    //좋아요 취소 요청
    public void deleteWish(int wishNo, TokenUserInfo userInfo) {
        //삭제하려는 해당 좋아요 정보 다 가지고 오기
        Wish targetWish = wishRepository.findById(wishNo).orElseThrow(
                () -> new RuntimeException("삭제 권한이 없습니다.")
        );
        //삭제하려는 유저와 좋아요 누른 유저가 같은지 확인
        if(!userInfo.getUserId().equals(targetWish.getUser().getUserId())) {
            throw new RuntimeException("삭제 권한이 없습니다.");
        }
        wishRepository.deleteById(wishNo);

    }

    //마이페이지에서 좋아요 한 게시물 끌어오기
    public AdoptListResponseDTO wishList(String userId) {
        log.info("서비스에서 좋아요 목록 요청 들어옴 -{}", userId);

        //좋아요 목록 끌고오기
        List<Wish> wishList = wishRepository.findDesertionNoByUserUserId(userId);
        log.info("레파지토리에서 가져온 List -{}", wishList);

        List<String> desertionNoList = wishList.stream().map(
                wish -> wish.getAdopt().getDesertionNo()
        ).collect(Collectors.toList());// 분양게시판 글번호 목록 받기


        List<Adopt> wishAdoptList = new ArrayList<>();

        for (String adoptNo  : desertionNoList) {
            Adopt wishAdopt = bringAdoptListBoard(adoptNo);
          wishAdoptList.add(wishAdopt);
        }
        List<AdoptResponseDTO> AdoptionList = wishAdoptList.stream()
                .map(AdoptResponseDTO::new)
                .collect(Collectors.toList());//글목록 받기

          return AdoptListResponseDTO.builder()
                .adoptLists(AdoptionList)
              .build();

    }

    // 유기번호 리스트가 온다, 여기서 입양신청된 유기견 리스트를 반환해야 한다.
    public AdoptListResponseDTO findAdoptionList(List<String> desertionNoList) {
        List<Adopt> AdoptList = adoptRepository.findByDesertionNoIn(desertionNoList);

        List<AdoptResponseDTO> dtoList = AdoptList.stream().map(AdoptResponseDTO::new)
                .collect(Collectors.toList());//리스트를 dto리스트로 변환

        return AdoptListResponseDTO.builder()
                .adoptLists(dtoList)
                .build();

       
    }





    ////////////////////////////메서드 ///////////////////////////////////

    //분양게시물 찾기 메서드
    private Adopt bringAdoptListBoard(String desertionNo) {
        return adoptRepository.findById(desertionNo).orElseThrow(
                () -> new RuntimeException("게시물 정보가 없습니다.")
        );
    }



    //회원 정보 찾기 메서드
    private User getUser(String userId) {
        User user = userRepository.findById((userId)).orElseThrow(
                () -> new RuntimeException("등록 권한이 없습니다.")
        );
        return user;

    }



}
