package SOMS.super_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Payments")
public class Payment {

    @Id
    private String id;  // Unique Payment ID

    private String orderId;  // Link to the Order
    private String userId;   // The customer who made the payment

    private String paymentMethod;  // COD, ONLINE
    private String transactionId;  // Only for ONLINE payments
    private double amount;  // Paid amount

    private String status;  // PENDING, SUCCESS, FAILED

    private LocalDateTime paymentDate;  // Timestamp of payment
}
