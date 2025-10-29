package com.app.Web_Based_Shopping_Mall.controller;

import com.app.Web_Based_Shopping_Mall.entity.ShoppingCart;
import com.app.Web_Based_Shopping_Mall.service.ShoppingCartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final ShoppingCartService cartService;

    public CartController(ShoppingCartService cartService) {
        this.cartService = cartService;
    }

    // Get customer's cart
    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCart(@PathVariable("customerId") Long customerId) {
        try {
            ShoppingCart cart = cartService.getCart(customerId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Add an item to the cart
    @PostMapping("/add")
    public ResponseEntity<?> addItem(
            @RequestParam("customerId") Long customerId,
            @RequestParam("productId") Long productId,
            @RequestParam("quantity") int quantity) {
        try {
            ShoppingCart cart = cartService.addItem(customerId, productId, quantity);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Update item quantity
    @PutMapping("/items/{itemId}")
    public ResponseEntity<?> updateItem(
            @PathVariable("itemId") Long itemId,
            @RequestParam("quantity") int quantity) {
        try {
            ShoppingCart cart = cartService.updateItem(itemId, quantity);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Remove item from cart
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<?> removeItem(@PathVariable("itemId") Long itemId) {
        try {
            ShoppingCart cart = cartService.removeItem(itemId);
            return ResponseEntity.ok(cart);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Checkout cart
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestParam("customerId") Long customerId) {
        try {
            BigDecimal total = cartService.checkout(customerId);
            return ResponseEntity.ok(Map.of("totalAmount", total));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
