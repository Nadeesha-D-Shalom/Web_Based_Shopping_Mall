package com.app.Web_Based_Shopping_Mall.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name = "staff")
public class Staff {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long staffId;

    @Column(nullable = false, length = 120)
    private String fullName;

    @Column(nullable = false, length = 160, unique = true)
    private String email;

    @Column(nullable = false, length = 100)
    private String position;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
