package com.app.Web_Based_Shopping_Mall.service;

import com.app.Web_Based_Shopping_Mall.entity.CartItem;
import com.app.Web_Based_Shopping_Mall.entity.Product;
import com.app.Web_Based_Shopping_Mall.entity.ShoppingCart;
import com.app.Web_Based_Shopping_Mall.entity.UserEntity;
import com.app.Web_Based_Shopping_Mall.repository.CartItemRepository;
import com.app.Web_Based_Shopping_Mall.repository.ProductRepository;
import com.app.Web_Based_Shopping_Mall.repository.ShoppingCartRepository;
import com.app.Web_Based_Shopping_Mall.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ShoppingCartService {

    private final ShoppingCartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ShoppingCartService(ShoppingCartRepository cartRepository,
                               CartItemRepository cartItemRepository,
                               ProductRepository productRepository,
                               UserRepository userRepository) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    // Get or create a cart for customer
    public ShoppingCart getCart(Long customerId) {
        UserEntity user = userRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Customer ID: " + customerId));

        // use findByUser_UserId() instead of findByCustomerId()
        return cartRepository.findByUser_UserId(customerId)
                .orElseGet(() -> {
                    ShoppingCart newCart = new ShoppingCart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }

    // Add product to cart
    public ShoppingCart addItem(Long customerId, Long productId, int quantity) {
        ShoppingCart cart = getCart(customerId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<CartItem> existingItems = cartItemRepository.findAll(); // replace with proper cart-based filtering if needed
        for (CartItem item : existingItems) {
            if (item.getCart().getCartId().equals(cart.getCartId())
                    && item.getProduct().getProductId().equals(productId)) {
                item.setQuantity(item.getQuantity() + quantity);
                cartItemRepository.save(item);
                updateTotal(cart);
                return cartRepository.save(cart);
            }
        }

        CartItem newItem = new CartItem();
        newItem.setCart(cart);
        newItem.setProduct(product);
        newItem.setQuantity(quantity);
        cartItemRepository.save(newItem);

        updateTotal(cart);
        return cartRepository.save(cart);
    }

    // Update item quantity
    public ShoppingCart updateItem(Long itemId, int quantity) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        item.setQuantity(quantity);
        cartItemRepository.save(item);

        ShoppingCart cart = item.getCart();
        updateTotal(cart);
        return cartRepository.save(cart);
    }

    // Remove item
    public ShoppingCart removeItem(Long itemId) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("CartItem not found"));

        ShoppingCart cart = item.getCart();
        cartItemRepository.delete(item);

        updateTotal(cart);
        return cartRepository.save(cart);
    }

    // Checkout → clears items but returns final total
    public BigDecimal checkout(Long customerId) {
        ShoppingCart cart = getCart(customerId);
        BigDecimal total = cart.getTotalPrice();

        cart.getItems().clear();
        cartRepository.save(cart);

        return total;
    }

    // Recalculate cart total
    private void updateTotal(ShoppingCart cart) {
        List<CartItem> items = cart.getItems();
        BigDecimal total = items.stream()
                .map(CartItem::getSubTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalPrice(BigDecimal.ZERO);

    }
}
