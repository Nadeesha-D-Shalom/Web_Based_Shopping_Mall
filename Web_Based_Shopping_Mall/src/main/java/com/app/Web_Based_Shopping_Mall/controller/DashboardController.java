package com.app.Web_Based_Shopping_Mall.controller;

import com.app.Web_Based_Shopping_Mall.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController @RequestMapping("/api/dashboard") @CrossOrigin
public class DashboardController {
    private final AdminRepository adminRepo;
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final StaffRepository staffRepo;

    public DashboardController(AdminRepository adminRepo, ProductRepository productRepo,
                               OrderRepository orderRepo, StaffRepository staffRepo) {
        this.adminRepo = adminRepo; this.productRepo = productRepo;
        this.orderRepo = orderRepo; this.staffRepo = staffRepo;
    }

    @GetMapping("/counts")
    public Map<String, Long> counts(){
        return Map.of(
                "admins", adminRepo.count(),
                "products", productRepo.count(),
                "orders", orderRepo.count(),
                "staff", staffRepo.count()
        );
    }
}
