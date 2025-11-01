package com.app.Web_Based_Shopping_Mall.controller;

import com.app.Web_Based_Shopping_Mall.entity.Staff;
import com.app.Web_Based_Shopping_Mall.service.StaffService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "*")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    // Get all staff
    @GetMapping
    public ResponseEntity<?> getAllStaff() {
        List<Staff> staffList = staffService.getAllStaff();
        return ResponseEntity.ok(staffList);
    }

    // Get staff by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable("id") Long id) {
        Optional<Staff> staff = staffService.getStaffById(id);

        if (staff.isPresent()) {
            return ResponseEntity.ok(staff.get());
        } else {
            return ResponseEntity.status(404).body(Map.of("error", "Staff not found"));
        }
    }

    // Create staff
    @PostMapping
    public ResponseEntity<?> createStaff(@RequestBody Staff staff) {
        Staff saved = staffService.saveStaff(staff);
        return ResponseEntity.ok(saved);
    }

    // Update staff
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable("id") Long id, @RequestBody Staff staff) {
        try {
            Staff updated = staffService.updateStaff(id, staff);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Delete staff
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable("id") Long id) {
        try {
            staffService.deleteStaff(id);
            return ResponseEntity.ok(Map.of("message", "Staff deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
