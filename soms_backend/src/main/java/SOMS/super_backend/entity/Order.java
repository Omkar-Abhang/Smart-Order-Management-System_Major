package SOMS.super_backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "Orders")
public class Order {
    @Id
    private String id;

    private String userId; // Customer who placed the order
    private List<OrderItem> items;
    private double totalAmount;
    private String paymentMethod; // COD or ONLINE
    private String paymentStatus; // PENDING, COMPLETED, FAILED
    private String transactionId; // for online payments
    private String address;
    private String orderStatus; // PENDING, PREPARING, OUT_FOR_DELIVERY, DELIVERED
    private LocalDateTime orderDate;  // Timestamp of order placement

}

@Data
class OrderItem {
    private String productId;
    private String productname;
    private String productimage;
    private int quantity;
    private double price;
}


