package com.app.Web_Based_Shopping_Mall.service;

import com.app.Web_Based_Shopping_Mall.entity.OrderEntity;
import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<OrderEntity> getAllOrders();
    Optional<OrderEntity> getOrderById(Long id);
    OrderEntity saveOrder(OrderEntity order);
    OrderEntity updateOrder(Long id, OrderEntity order);
    void deleteOrder(Long id);
}
