package SOMS.super_backend.service;

import SOMS.super_backend.entity.Order;
import SOMS.super_backend.repository.OrderRepository;
import SOMS.super_backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private TransactionRepository transactionRepository;

    public Order placeOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser(String userId) {
        // Fetching orders from the repository using the userId
        return orderRepository.findByUserId(userId);
    }}

