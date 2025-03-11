package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId); // Find orders by user ID
    List<Order> findByOrderStatus(String orderStatus); // Find orders by status
    List<Order> findByPaymentStatus(String paymentStatus); // Find orders by payment status

}

