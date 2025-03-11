package SOMS.super_backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "Transaction")
public class Transaction {
    @Id
    private int transactionId;

    @DBRef
    private Order order;  // Reference to the Order

    @DBRef
    private User user;     // Reference to the User who made the payment
    private LocalDateTime paymentDate;
    private double  amount;
    private String paymentMethod;   // E.g., cash or online
    private String status;  // E.g., "Success", "Failed"


}
