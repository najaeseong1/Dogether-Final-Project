package com.ictedu.dogether.payment.entity;

import com.ictedu.dogether.userapi.entity.User;
import lombok.*;

import javax.persistence.*;

import com.ictedu.dogether.userapi.entity.User;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "card_info")
public class CardInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_reg_no")
    private int cardRegNo;          // 카드 테이블 번호

    @Column(name = "issuer_code")
    private String issuerCode;      // 카드 발급사 숫자

    @Column(name = "acquirer_code")
    private String acquirerCode;    // 카드 매입사 숫자

    @Column(name = "card_number")
    private String cardNumber;          // 카드번호 (일부 번호 마스킹 처리)

    @Column(name = "card_type")
    private String cardType;        // 카드 종류 신용, 체크, 기프트, 미확인

    @Column(name = "owner_type")
    private String ownerType;       // 카드의 소유자 타입 개인, 법인, 미확인

    @Column(name = "installment_plan_months")
    private int installmentPlanMonths; // 할부 개월 수

    @Column(name = "is_interest_free")
    private String isInterestFree; // 무이자 할부의 적용 여부

    @Column(name = "interest_payer")
    private String interestPayer;   // 할부가 적용된 결제에서 할부 수수료를 부담하는 주체

    @Column(name = "approve_no")
    private String approveNo;       // 카드사 승인 번호

    @Column(name = "use_card_point")
    private String useCardPoint;   // 카드사 포인트 사용 여부

    @Column(name = "acquire_status")
    private String acquireStatus;   // 카드 결제의 매입 상태
//                                    - READY: 아직 매입 요청이 안 된 상태입니다.
//                                    - REQUESTED: 매입이 요청된 상태입니다.
//                                    - COMPLETED: 요청된 매입이 완료된 상태입니다.
//                                    - CANCEL_REQUESTED: 매입 취소가 요청된 상태입니다.
//                                    - CANCELED: 요청된 매입 취소가 완료된 상태입니다.

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name =  "user_id" )
    private User User;                  // 유저 정보
}
