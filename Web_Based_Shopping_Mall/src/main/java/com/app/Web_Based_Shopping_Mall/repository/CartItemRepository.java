package com.app.Web_Based_Shopping_Mall.repository;

import com.app.Web_Based_Shopping_Mall.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
