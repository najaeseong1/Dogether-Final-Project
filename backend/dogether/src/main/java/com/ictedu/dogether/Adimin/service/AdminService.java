package com.ictedu.dogether.Adimin.service;

import com.ictedu.dogether.Adimin.Entity.Admin;
import com.ictedu.dogether.Adimin.dto.request.statusRegistRequestDTO;
import com.ictedu.dogether.Adimin.dto.response.statusRegistResponseDTO;
import com.ictedu.dogether.Adimin.repository.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AdminService {

    private final AdminRepository adminRepository;

//    //입양신청서 상태 등록
//    public statusRegistResponseDTO statusRegist(statusRegistRequestDTO dto) {
//
//
//    }
//
//    //입양 목록 끌고오기
//    public void statusList(String adminId) {
//        //입양 승인, 취소가 들어간 입양 목록을 끌고와야 한다.
//
//    }
}
