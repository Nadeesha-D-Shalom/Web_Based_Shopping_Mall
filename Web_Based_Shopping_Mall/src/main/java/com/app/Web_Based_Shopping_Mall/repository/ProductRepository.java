package com.app.Web_Based_Shopping_Mall.repository;

import com.app.Web_Based_Shopping_Mall.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
