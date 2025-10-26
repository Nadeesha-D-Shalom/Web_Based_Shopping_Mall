package com.app.Web_Based_Shopping_Mall.repository;

import com.app.Web_Based_Shopping_Mall.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
}
