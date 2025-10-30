package com.app.Web_Based_Shopping_Mall.service.impl;

import com.app.Web_Based_Shopping_Mall.entity.OrderEntity;
import com.app.Web_Based_Shopping_Mall.repository.OrderRepository;
import com.app.Web_Based_Shopping_Mall.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<OrderEntity> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public OrderEntity saveOrder(OrderEntity order) {
        return orderRepository.save(order);
    }

    @Override
    public OrderEntity updateOrder(Long id, OrderEntity order) {
        return orderRepository.findById(id)
                .map(existing -> {
                    existing.setCustomerName(order.getCustomerName());
                    existing.setCustomerEmail(order.getCustomerEmail());
                    existing.setStatus(order.getStatus());
                    existing.setTotalAmount(order.getTotalAmount());
                    existing.setStaffId(order.getStaffId());
                    return orderRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
