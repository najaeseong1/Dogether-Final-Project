package com.ictedu.dogether.payment.repository;

import com.ictedu.dogether.adoptContract.Entity.AdoptContract;
import com.ictedu.dogether.adoptContract.Entity.AdoptionStatus;
import com.ictedu.dogether.payment.dto.PaymentStatus;
import com.ictedu.dogether.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public interface PaymentEntityRepository extends JpaRepository<Payment, String> {
    List<Payment> findByUserUserId(String userId);

    Payment findByOrderId(String orderId);

    List<Payment> findByStatus(PaymentStatus status);

    


}