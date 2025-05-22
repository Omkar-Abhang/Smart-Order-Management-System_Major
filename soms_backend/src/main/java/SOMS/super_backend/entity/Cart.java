package SOMS.super_backend.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "Cart")
@NoArgsConstructor(force = true, access = AccessLevel.PRIVATE) // Prevent accidental usage
public class Cart {

    public Cart(String userId) {
        this.userId = userId;
        this.items = new ArrayList<>();
        this.totalAmount = 0.0;
    }

    @Id
    private String id;

    private String userId; // Customer who owns the cart
    private List<CartItem> items=new ArrayList<>(); // List of items in the cart
    private double totalAmount; // Total amount for the cart

    // Method to calculate total amount for the cart
    public void calculateTotalAmount() {
        this.totalAmount = items.stream()
                .mapToDouble(item -> item.getQuantity() * item.getPrice())
                .sum();
    }


}


