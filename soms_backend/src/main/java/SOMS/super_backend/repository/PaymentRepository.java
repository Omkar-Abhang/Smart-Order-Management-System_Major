package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByUserId(String userId); // Find all payments by user ID
    Optional<Payment> findByTransactionId(String transactionId); // Find payment by transaction ID
    List<Payment> findByOrderId(String orderId); // Find payments by order ID
    List<Payment> findByStatus(String status); // Find payments by status

}


