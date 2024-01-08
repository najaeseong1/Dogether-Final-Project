package com.ictedu.dogether.adoptApi.repository;

import com.ictedu.dogether.adoptApi.Entity.Adopt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptRepository extends JpaRepository<Adopt, String> {

    List<Adopt> findByDesertionNoIn(List<String> desertionNoList);
}
