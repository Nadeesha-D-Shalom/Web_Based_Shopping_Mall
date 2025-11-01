package com.app.Web_Based_Shopping_Mall.repository;

import com.app.Web_Based_Shopping_Mall.entity.ShoppingCart;
import com.app.Web_Based_Shopping_Mall.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    // find by full User object
    Optional<ShoppingCart> findByUser(UserEntity user);

    // find directly by userId (this is what your service now calls)
    Optional<ShoppingCart> findByUser_UserId(Long userId);
}
