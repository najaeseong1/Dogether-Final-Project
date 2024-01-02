package com.ictedu.dogether.payment.repository;

import com.ictedu.dogether.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Objects;

public interface PaymentEntityRepository extends JpaRepository<Payment, String> {
    List<Payment> findByUser_UserId(String userId);

    Payment findByOrderId(String orderId);
}