package com.ictedu.dogether.payment.repository;

import com.ictedu.dogether.payment.entity.CardInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardInfoEntityRepository extends JpaRepository<CardInfo, String> {
}
