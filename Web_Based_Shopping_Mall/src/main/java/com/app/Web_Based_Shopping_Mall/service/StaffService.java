package com.app.Web_Based_Shopping_Mall.service;

import com.app.Web_Based_Shopping_Mall.entity.Staff;

import java.util.List;
import java.util.Optional;

public interface StaffService {
    List<Staff> getAllStaff();
    Optional<Staff> getStaffById(Long id);
    Staff saveStaff(Staff staff);
    Staff updateStaff(Long id, Staff staff);
    void deleteStaff(Long id);
}
