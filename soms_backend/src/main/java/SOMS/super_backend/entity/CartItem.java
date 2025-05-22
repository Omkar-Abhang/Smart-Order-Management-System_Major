package SOMS.super_backend.entity;

import lombok.Data;

@Data
public class CartItem {
    private String productId; // Product added to the cart
    private String productname;
    private String productimage;
    private int quantity; // Quantity of the product
    private double price; // Price of the product
}
