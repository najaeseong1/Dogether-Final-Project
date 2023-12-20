package com.ictedu.dogether.adoptApi.api;

import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.adoptApi.dto.response.AdoptListResponseDTO;
import com.ictedu.dogether.adoptApi.dto.response.AdoptResponseDTO;
import com.ictedu.dogether.adoptApi.service.ApiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/adopt")
@CrossOrigin
public class ApiController {

    private  final ApiService apiService;

    //api 통한 강아지 목록 불러오기
    @GetMapping
    public ResponseEntity<?> getAdoptList() {
        try {
            AdoptListResponseDTO adoptList = apiService.getAdoptList();
            return ResponseEntity.ok().body(adoptList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //분양게시글 상세보기 요청
    @GetMapping("/detail/{desertionNo}")
    public ResponseEntity<?> detailPage(@PathVariable("desertionNo") String desertionNo) {
        AdoptResponseDTO detailPage = apiService.getDetailPage(desertionNo);

        return ResponseEntity.ok().body(detailPage);
    }


    //

}



