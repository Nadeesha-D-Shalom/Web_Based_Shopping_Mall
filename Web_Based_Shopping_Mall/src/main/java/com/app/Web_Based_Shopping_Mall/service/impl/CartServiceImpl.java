package com.app.Web_Based_Shopping_Mall.service.impl;

import com.app.Web_Based_Shopping_Mall.entity.*;
import com.app.Web_Based_Shopping_Mall.repository.*;
import com.app.Web_Based_Shopping_Mall.service.CartService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final ShoppingCartRepository cartRepo;
    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final CartItemRepository itemRepo;
    private final OrderRepository orderRepo;

    public CartServiceImpl(ShoppingCartRepository cartRepo, UserRepository userRepo,
                           ProductRepository productRepo, CartItemRepository itemRepo,
                           OrderRepository orderRepo) {
        this.cartRepo = cartRepo;
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.itemRepo = itemRepo;
        this.orderRepo = orderRepo;
    }

    @Override
    public ShoppingCart getCartByUserId(Long userId) {
        UserEntity user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepo.findByUser(user).orElseGet(() -> {
            ShoppingCart cart = new ShoppingCart();
            cart.setUser(user);
            return cartRepo.save(cart);
        });
    }

    @Override
    public ShoppingCart addItem(Long userId, Long productId, int quantity) {
        ShoppingCart cart = getCartByUserId(userId);
        Product product = productRepo.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setQuantity(quantity);
        itemRepo.save(item);
        return cartRepo.findById(cart.getCartId()).orElseThrow();
    }

    @Override
    public ShoppingCart updateItem(Long itemId, int quantity) {
        CartItem item = itemRepo.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));
        item.setQuantity(quantity);
        itemRepo.save(item);
        return item.getCart();
    }

    @Override
    public void removeItem(Long itemId) {
        itemRepo.deleteById(itemId);
    }

    @Override
    public double checkout(Long userId) {
        ShoppingCart cart = getCartByUserId(userId);
        BigDecimal total = cart.getTotalPrice();
        // simple checkout: clear cart after order creation (we’ll wire Order logic next)
        cart.getItems().clear();
        cartRepo.save(cart);
        return total.doubleValue();
    }
}
