package com.app.Web_Based_Shopping_Mall.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "products")
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable = false, length = 160)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    @Column(length = 60)
    private String size;

    @Column(length = 80)
    private String category;

    @Column(nullable = false)
    private Integer quantity;

    @Column(length = 512)
    private String imageUrl;
}
