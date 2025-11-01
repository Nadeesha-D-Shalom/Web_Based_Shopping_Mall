package com.app.Web_Based_Shopping_Mall.service.impl;

import com.app.Web_Based_Shopping_Mall.entity.Staff;
import com.app.Web_Based_Shopping_Mall.repository.StaffRepository;
import com.app.Web_Based_Shopping_Mall.service.StaffService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffServiceImpl implements StaffService {

    private final StaffRepository staffRepository;

    public StaffServiceImpl(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Override
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @Override
    public Optional<Staff> getStaffById(Long id) {
        return staffRepository.findById(id);
    }

    @Override
    public Staff saveStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    @Override
    public Staff updateStaff(Long id, Staff staff) {
        Staff existing = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        existing.setFullName(staff.getFullName());
        existing.setEmail(staff.getEmail());
        existing.setPosition(staff.getPosition());
        return staffRepository.save(existing);
    }

    @Override
    public void deleteStaff(Long id) {
        staffRepository.deleteById(id);
    }
}
