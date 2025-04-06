package SOMS.super_backend.service;

import SOMS.super_backend.entity.Payment;
import SOMS.super_backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Service
@RestController
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    // 🔹 Create or Update Payment
    public Payment createOrUpdatePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // 🔹 Get All Payments
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // 🔹 Get Payment by ID
    public Optional<Payment> getPaymentById(String id) {
        return paymentRepository.findById(id);
    }

    // 🔹 Get Payments by User ID
    public List<Payment> getPaymentsByUserId(String userId) {
        return paymentRepository.findByUserId(userId);
    }

    // 🔹 Get Payments by Order ID
    public List<Payment> getPaymentsByOrderId(String orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    // 🔹 Get Payments by Status
    public List<Payment> getPaymentsByStatus(String status) {
        return paymentRepository.findByStatus(status);
    }

    // 🔹 Update Payment Status
    public Payment updatePaymentStatus(String id, String status, String transactionId) {
        Optional<Payment> paymentOpt = paymentRepository.findById(id);
        if (paymentOpt.isPresent()) {
            Payment payment = paymentOpt.get();
            payment.setStatus(status);
            payment.setTransactionId(transactionId);
            return paymentRepository.save(payment);
        }
        return null; // Or throw an exception
    }
}
