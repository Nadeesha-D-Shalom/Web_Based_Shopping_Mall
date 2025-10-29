package com.app.Web_Based_Shopping_Mall.service;

import com.app.Web_Based_Shopping_Mall.entity.ShoppingCart;

public interface CartService {
    ShoppingCart getCartByUserId(Long userId);
    ShoppingCart addItem(Long userId, Long productId, int quantity);
    ShoppingCart updateItem(Long itemId, int quantity);
    void removeItem(Long itemId);
    double checkout(Long userId);
}
