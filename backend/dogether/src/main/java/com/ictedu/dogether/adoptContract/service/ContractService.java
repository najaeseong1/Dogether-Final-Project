package com.ictedu.dogether.adoptContract.service;


import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.adoptApi.repository.AdoptRepository;
import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import com.ictedu.dogether.Adimin.dto.request.AdminPageRegistDTO;
import com.ictedu.dogether.adoptContract.Entity.AdoptionStatus;
import com.ictedu.dogether.adoptContract.dto.request.AdoptRegistDTO;
import com.ictedu.dogether.adoptContract.dto.response.AdminListResponseDTO;
import com.ictedu.dogether.adoptContract.dto.response.CombinedResponseDTO;
import com.ictedu.dogether.adoptContract.dto.response.RegistResponseDTO;
import com.ictedu.dogether.adoptContract.repository.ContractRepository;
import com.ictedu.dogether.auth.TokenUserInfo;
import com.ictedu.dogether.userapi.entity.Role;
import com.ictedu.dogether.userapi.entity.User;
import com.ictedu.dogether.userapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional

public class ContractService {

    private final ContractRepository contractRepository;
    private final UserRepository userRepository;
    private final AdoptRepository adoptRepository;

    //입양 신청서 등록
    public RegistResponseDTO adoptRegist(AdoptRegistDTO dto, TokenUserInfo userInfo) {

        User user = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );
        Adopt adopt = adoptRepository.findById(dto.getDesertionNo()).orElseThrow(
                () -> new RuntimeException("게시물 정보가 없습니다.")
        );

        AdoptContract saveAdopt = contractRepository.save(dto.ToEntity(user,adopt));

        return new RegistResponseDTO(saveAdopt);
    }


    //관리자 페이지 속 입양 신청 목록 끌고오기
    public AdminListResponseDTO getAdminList(TokenUserInfo userInfo) {


        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );

        //관리자만 들어갈 수 있어야 함
        if(!targetUser.getRole().equals(Role.ADMIN)) {
            throw new RuntimeException("요청 권한이 없습니다.");
        }

        List<AdoptContract> findlist = contractRepository.findAll();

        //여기서 던져줘야 할거 : 시간, 글쓴이, 유기번호
        List<RegistResponseDTO> dtoList = findlist.stream().map(RegistResponseDTO::new)
                .collect(Collectors.toList());

        return AdminListResponseDTO.builder()
                .dtoList(dtoList)
                .build();


    }

    //관리자 페이지, 입양 신청 상세 페이지
    public AdminListResponseDTO getListDetail(String desertionNo, TokenUserInfo userInfo) {
        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );

        //관리자만 들어갈 수 있어야 함
        if(!targetUser.getRole().equals(Role.ADMIN)) {
            throw new RuntimeException("요청 권한이 없습니다.");
        }
        List<AdoptContract> DetailPage = contractRepository.findByAdopt_DesertionNo(desertionNo);

        List<CombinedResponseDTO> toDtoDetail = DetailPage.stream().map(CombinedResponseDTO::new)
                .collect(Collectors.toList());

    return AdminListResponseDTO.builder()
            .DetailList(toDtoDetail)
            .build();






    }

    //admin DB 저장 요청
    public void adminRegist(TokenUserInfo userInfo, AdminPageRegistDTO dto) {

        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );

        //관리자만 들어갈 수 있어야 함
        if(!targetUser.getRole().equals(Role.ADMIN)) {
            throw new RuntimeException("요청 권한이 없습니다.");
        }


    }

    //입양 신청 승인 코드
    public void approvedRegist(TokenUserInfo userInfo, int contractNo) {

        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );
        //관리자만 들어갈 수 있어야 함
        if(!targetUser.getRole().equals(Role.ADMIN)) {
            throw new RuntimeException("요청 권한이 없습니다.");
        }

        //id에 맞는 그 입양신청서
        AdoptContract targetInfo = contractRepository.findById(contractNo).orElseThrow(
                () -> new RuntimeException("입양 신청서 정보가 없습니다.")
        );
        targetInfo.setAdoptionStatus(AdoptionStatus.APPROVED);
        targetInfo.setReasonsRefusal(null);

        contractRepository.save(targetInfo);

    }
    
    //입양 신청 거절 코드
    public void rejected(int contracctNo, String refusalReason, TokenUserInfo userInfo) {
        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );
        //관리자만 들어갈 수 있어야 함
        if(!targetUser.getRole().equals(Role.ADMIN)) {
            throw new RuntimeException("요청 권한이 없습니다.");
        }

        AdoptContract targetInfo = contractRepository.findById(contracctNo).orElseThrow(
                () -> new RuntimeException("입양 신청서 정보가 없습니다.")
        );
        targetInfo.setAdoptionStatus(AdoptionStatus.REJECTED);
        targetInfo.setReasonsRefusal(refusalReason);

        contractRepository.save(targetInfo);

    }
}

//    //관리자에게 입양 목록 리스트 반환
//    public AdminListResponseDTO getAdminList(TokenUserInfo userInfo) {
//
//        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
//                () -> new RuntimeException("회원 정보가 없습니다.")
//        );
//        //관리자만 들어갈 수 있어야 함
//        if(!targetUser.getRole().equals(Role.ADMIN)) {
//            throw new RuntimeException("요청 권한이 없습니다.");
//        }
//
//        //입양 신청 목록 받아옴
//        List<adoptContract> findContractList = contractRepository.findAll();
//
//        List<RegistResponseDTO> dtoList = new ArrayList<>();
//
//        for(adoptContract dto :  findContractList) {
//            RegistResponseDTO dtoRes = new RegistResponseDTO(dto);
//            dtoList.add(dtoRes);
//        }
//
//
//        return AdminListResponseDTO.builder()
//                .dtoList(dtoList)
//                .build();
//
//    }

//    public void getAdminDetail(TokenUserInfo userInfo) {
//
//        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
//                () -> new RuntimeException("회원 정보가 없습니다.")
//        );
//        //관리자만 들어갈 수 있어야 함
//        if(!targetUser.getRole().equals(Role.ADMIN)) {
//            throw new RuntimeException("요청 권한이 없습니다.");
//        }
//    }
// }
