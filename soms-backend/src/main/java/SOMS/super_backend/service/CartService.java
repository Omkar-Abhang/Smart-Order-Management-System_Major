package SOMS.super_backend.service;

import SOMS.super_backend.entity.Cart;

import SOMS.super_backend.entity.CartItem;
import SOMS.super_backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Service
@RestController

public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // 🔹 Get Cart by User ID
    public Cart getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId).orElse(new Cart());
    }

    // 🔹 Add Item to Cart
    public Cart addItemToCart(String userId, CartItem newItem) {
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart());
        cart.setUserId(userId);

        // Check if product already exists in cart
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(newItem.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            // Update quantity if product exists
            existingItem.get().setQuantity(existingItem.get().getQuantity() + newItem.getQuantity());
        } else {
            // Add new item
            cart.getItems().add(newItem);
        }

        // Recalculate total amount
        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    // 🔹 Remove Item from Cart
    public Cart removeItemFromCart(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart());

        // Remove item by productId
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));

        // Recalculate total amount
        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    // 🔹 Update Item Quantity in Cart
    public Cart updateItemQuantity(String userId, String productId, int newQuantity) {
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart());

        cart.getItems().forEach(item -> {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(newQuantity);
            }
        });

        // Recalculate total amount
        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    // 🔹 Clear Cart
    public void clearCart(String userId) {
        cartRepository.findByUserId(userId).ifPresent(cart -> {
            cart.getItems().clear();
            cart.setTotalAmount(0);
            cartRepository.save(cart);
        });
    }
}
