package SOMS.super_backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "Cart")
public class Cart {
    @Id
    private String id;

    private String userId; // Customer who owns the cart
    private List<CartItem> items; // List of items in the cart
    private double totalAmount; // Total amount for the cart

    // Method to calculate total amount for the cart
    public void calculateTotalAmount() {
        this.totalAmount = items.stream()
                .mapToDouble(item -> item.getQuantity() * item.getPrice())
                .sum();
    }
}


