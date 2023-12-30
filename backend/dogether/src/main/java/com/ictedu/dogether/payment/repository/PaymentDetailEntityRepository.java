package com.ictedu.dogether.payment.repository;

import com.ictedu.dogether.Board.Entity.Board;
import com.ictedu.dogether.payment.entity.PaymentDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentDetailEntityRepository extends JpaRepository<PaymentDetail, String> {
    List<PaymentDetail> findByPaymentDetailId(Long paymentDetailId);
}
