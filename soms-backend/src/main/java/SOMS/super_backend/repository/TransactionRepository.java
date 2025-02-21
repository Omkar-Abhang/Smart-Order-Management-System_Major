package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByOrderId(String orderId);
}

