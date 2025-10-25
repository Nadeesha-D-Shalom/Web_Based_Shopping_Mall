package com.app.Web_Based_Shopping_Mall.repository;

import com.app.Web_Based_Shopping_Mall.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
