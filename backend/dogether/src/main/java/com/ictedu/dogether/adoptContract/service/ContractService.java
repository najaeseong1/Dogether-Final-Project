package com.ictedu.dogether.adoptContract.service;


import com.ictedu.dogether.adoptApi.Entity.Adopt;
import com.ictedu.dogether.adoptApi.repository.AdoptRepository;
import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import com.ictedu.dogether.adoptContract.Entity.AdoptionStatus;
import com.ictedu.dogether.adoptContract.dto.request.AdoptRegistDTO;
import com.ictedu.dogether.adoptContract.dto.request.RejectedRequestDTO;
import com.ictedu.dogether.adoptContract.dto.response.*;
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
        //만약 사용자가 같은 분양게시물에서 입양 신청을 한다면 막아줘야 한다.
        boolean exist = contractRepository.existsByUser_UserIdAndAdopt_DesertionNo(userInfo.getUserId(), dto.getDesertionNo());
        int duplicateStatus = 999;
        if(exist) {
            throw new RuntimeException("중복된 신청입니다. (Status: " + duplicateStatus + ")");
        }

        AdoptContract saveAdopt = contractRepository.save(dto.ToEntity(user,adopt));

        return new RegistResponseDTO(saveAdopt);
    }


    //마이페이지에 입양 신청 목록 끌고오기
    public AdminListResponseDTO getAdminList(TokenUserInfo userInfo) {


        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );


        List<AdoptContract> findlist = contractRepository.findByUserUserId(userInfo.getUserId());

        //여기서 던져줘야 할거 : 시간, 글쓴이, 유기번호
        List<RegistResponseDTO> dtoList = findlist.stream().map(RegistResponseDTO::new)
                .collect(Collectors.toList());

        return AdminListResponseDTO.builder()
                .dtoList(dtoList)
                .build();


    }

    //관리자 페이지, 입양 신청 상세 페이지
    public CombinedResponseDTO getListDetail(int contractNo, TokenUserInfo userInfo) {
        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );

        //관리자만 들어갈 수 있어야 함
        if(!targetUser.getRole().equals(Role.ADMIN)) {
            throw new RuntimeException("요청 권한이 없습니다.");
        }
        AdoptContract adoptContract = contractRepository.findById(contractNo).orElseThrow(
                () -> new RuntimeException("입양신청서 정보가 없습니다.")
        );

    return new CombinedResponseDTO(adoptContract);

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
    public void rejected(RejectedRequestDTO dto, TokenUserInfo userInfo) {
        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );
        //관리자만 들어갈 수 있어야 함
        if(!targetUser.getRole().equals(Role.ADMIN)) {
            throw new RuntimeException("요청 권한이 없습니다.");
        }

        AdoptContract targetInfo = contractRepository.findById(dto.getContractNo()).orElseThrow(
                () -> new RuntimeException("입양 신청서 정보가 없습니다.")
        );
        targetInfo.setAdoptionStatus(AdoptionStatus.REJECTED);
        targetInfo.setReasonsRefusal(dto.getRefusalReason());

        contractRepository.save(targetInfo);
    }

    //입양 승인 목록
    public List<ApproveListResponseDTO> getApproveList() {
        return contractRepository.findByAdoptionStatus(AdoptionStatus.APPROVED)
                .stream().map(ApproveListResponseDTO :: new)
                .collect(Collectors.toList());


    }

    //입양 거절 목록
    public List<ApproveListResponseDTO> getRejectedList() {
    return contractRepository.findByAdoptionStatus(AdoptionStatus.REJECTED).stream().map(ApproveListResponseDTO ::new)
                .collect(Collectors.toList());

    }

    //입양 접수 목록
    public List<ApproveListResponseDTO> getPendingList() {
        return contractRepository.findByAdoptionStatus(AdoptionStatus.PENDING).stream().map(ApproveListResponseDTO ::new)
                .collect(Collectors.toList());
    }

    //마이페이지 입양 신청 승인 쪽 상세보기
    public myPageApprovedDTO getMyPageDetail(TokenUserInfo userInfo, int contractNo) {


        User targetUser = userRepository.findById(userInfo.getUserId()).orElseThrow(
                () -> new RuntimeException("회원 정보가 없습니다.")
        );

        //id에 맞는 그 입양신청서
        AdoptContract targetInfo = contractRepository.findById(contractNo).orElseThrow(
                () -> new RuntimeException("입양 신청서 정보가 없습니다.")
        );

        if(targetInfo.getAdoptionStatus().equals(AdoptionStatus.APPROVED)) {
            log.info("Approved -{}", targetInfo);
            AdoptContract targetAdoption =
                    contractRepository.findByUser_UserIdAndAdopt_DesertionNo( targetInfo.getUser().getUserId(),targetInfo.getAdopt().getDesertionNo());

            return new myPageApprovedDTO(targetAdoption);

        }else if(targetInfo.getAdoptionStatus().equals(AdoptionStatus.REJECTED)) {

            AdoptContract targetAdoption =
                    contractRepository.findByUser_UserIdAndAdopt_DesertionNo( targetInfo.getUser().getUserId(),targetInfo.getAdopt().getDesertionNo());

            return new myPageApprovedDTO(targetAdoption, targetAdoption.getReasonsRefusal());
        }
        throw new RuntimeException("입양 승인 절차중입니다.");
    }
}

