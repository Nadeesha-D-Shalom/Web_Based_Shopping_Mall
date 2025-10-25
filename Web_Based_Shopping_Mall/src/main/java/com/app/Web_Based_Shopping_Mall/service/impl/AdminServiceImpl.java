package com.app.Web_Based_Shopping_Mall.service.impl;

import com.app.Web_Based_Shopping_Mall.entity.Admin;
import com.app.Web_Based_Shopping_Mall.repository.AdminRepository;
import com.app.Web_Based_Shopping_Mall.service.AdminService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    @Override
    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin updateAdmin(Long id, Admin admin) {
        Admin existing = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        existing.setUsername(admin.getUsername());
        existing.setPassword(admin.getPassword());
        existing.setEmail(admin.getEmail());
        existing.setFullName(admin.getFullName());
        return adminRepository.save(existing);
    }

    @Override
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
