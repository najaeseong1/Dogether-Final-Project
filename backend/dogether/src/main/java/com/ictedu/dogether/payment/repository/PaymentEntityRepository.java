package com.ictedu.dogether.payment.repository;

import com.ictedu.dogether.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentEntityRepository extends JpaRepository<Payment, Long> {
}