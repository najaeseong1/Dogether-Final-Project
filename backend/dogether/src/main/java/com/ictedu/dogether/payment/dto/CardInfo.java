package com.ictedu.dogether.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CardInfo {
    private int amount;             // 결제 가격
    private String issuerCode;      // 카드 발급사 숫자
    private String acquirerCode;    // 카드 매입사 숫자
    private String number;          // 카드번호 (일부 번호 마스킹 처리)
    private int installmentPlanMonths; // 할부 개월 수
    private boolean isInterestFree; // 무이자 할부의 적용 여부
    private String interestPayer;   // 할부가 적용된 결제에서 할부 수수료를 부담하는 주체
    private String approveNo;       // 카드사 승인 번호
    private boolean useCardPoint;   // 카드사 포인트 사용 여부
    private String cardType;        // 카드 종류 신용, 체크, 기프트, 미확인
    private String ownerType;       // 카드의 소유자 타입 개인, 법인, 미확인
    private String acquireStatus;   // 카드 결제의 매입 상태
//                                    - READY: 아직 매입 요청이 안 된 상태입니다.
//                                    - REQUESTED: 매입이 요청된 상태입니다.
//                                    - COMPLETED: 요청된 매입이 완료된 상태입니다.
//                                    - CANCEL_REQUESTED: 매입 취소가 요청된 상태입니다.
//                                    - CANCELED: 요청된 매입 취소가 완료된 상태입니다.
}
