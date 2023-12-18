// ApiService.java
package com.ictedu.dogether.adoptApi.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;
import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.adoptApi.dto.response.AdoptListResponseDTO;
import com.ictedu.dogether.adoptApi.dto.response.AdoptResponseDTO;
import com.ictedu.dogether.adoptApi.repository.AdoptRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
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

    public AdoptListResponseDTO getAdoptList() throws IOException {
        int numOfRows = 1000; // 페이지당 아이템 개수
        int totalItems = getTotalItems(); // 전체 아이템 개수
        List<Adopt> adoptList = new ArrayList<>();

        try {
            int totalPages = (int) Math.ceil((double) totalItems / numOfRows);

            for (int pageNo = 1; pageNo <= totalPages; pageNo++) {
                StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic");
                urlBuilder.append("?" + "serviceKey" + "=" + apiKey);
                urlBuilder.append("&" + URLEncoder.encode("bgnde","UTF-8") + "=" + URLEncoder.encode("20231117", "UTF-8")); /*유기날짜(검색 시작일) (YYYYMMDD)*/
                urlBuilder.append("&" + URLEncoder.encode("endde","UTF-8") + "=" + URLEncoder.encode("20231217", "UTF-8")); /*유기날짜(검색 종료일) (YYYYMMDD)*/
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

                JsonArray arr = obj.get("response").getAsJsonObject()
                        .get("body").getAsJsonObject()
                        .get("items").getAsJsonObject()
                        .get("item").getAsJsonArray();

                for (JsonElement jsonElement : arr) {
                    JsonObject temp = jsonElement.getAsJsonObject();
                    Adopt save = adoptRepository.save(Adopt.builder()
                            .desertionNo(temp.get("desertionNo").getAsString())
                            .kindCd(temp.get("kindCd").getAsString())
                            .gender(temp.get("sexCd").getAsString())
                            .weight(temp.get("weight").getAsString())
                            .happenAddr(temp.get("happenPlace").getAsString())
                            .profileImg(temp.get("popfile").getAsString())
                            .neuterYn(temp.get("neuterYn").getAsString())
                            .age(temp.get("age").getAsString())
                            .colorCd(temp.get("colorCd").getAsString())
                            .specialMark(temp.get("specialMark").getAsString())
                            .careNm(temp.get("careNm").getAsString())
                            .careTel(temp.get("careTel").getAsString())
                            .careAddr(temp.get("careAddr").getAsString())
                            .orgNm(temp.get("orgNm").getAsString())
                            .chargeNm(temp.get("chargeNm") == null ? "-" : temp.get("chargeNm").getAsString())
                            .officeTel(temp.get("officetel").getAsString())
                            .build());

                    adoptList.add(save);
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
    //게시물 상세조회
    public AdoptResponseDTO getDetailPage(String desertionNo) {
        Adopt targetPage = adoptRepository.findById(desertionNo).orElseThrow(
                () -> new RuntimeException("게시물 정보가 없습니다.")
        );

        return new AdoptResponseDTO(targetPage);

    }
}
