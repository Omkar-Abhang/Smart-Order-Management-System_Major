package SOMS.super_backend.service;

import SOMS.super_backend.entity.Order;
import SOMS.super_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Service
@RestController

public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // 🔹 Create or Update Order
    public Order createOrUpdateOrder(Order order) {
        return orderRepository.save(order);
    }

    // 🔹 Get All Orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 🔹 Get Order by ID
    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }

    // 🔹 Get Orders by User ID
    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    // 🔹 Get Orders by Order Status
    public List<Order> getOrdersByStatus(String orderStatus) {
        return orderRepository.findByOrderStatus(orderStatus);
    }

    // 🔹 Get Orders by Payment Status
    public List<Order> getOrdersByPaymentStatus(String paymentStatus) {
        return orderRepository.findByPaymentStatus(paymentStatus);
    }

    // 🔹 Update Order Status
    public Order updateOrderStatus(String id, String orderStatus) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }
        return null; // Or throw an exception
    }

    // 🔹 Update Payment Status
    public Order updatePaymentStatus(String id, String paymentStatus, String transactionId) {
        Optional<Order> orderOpt = orderRepository.findById(id);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setPaymentStatus(paymentStatus);
            order.setTransactionId(transactionId);
            return orderRepository.save(order);
        }
        return null; // Or throw an exception
    }

    // 🔹 Delete Order by ID
    public void deleteOrder(String id) {
        orderRepository.deleteById(id);
    }
}
