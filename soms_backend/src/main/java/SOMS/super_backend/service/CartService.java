package SOMS.super_backend.service;

import SOMS.super_backend.entity.Cart;
import SOMS.super_backend.entity.CartItem;
import SOMS.super_backend.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Get cart by userId
    public Optional<Cart> getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }

    // Add or update item in cart
    public Cart addOrUpdateItem(String userId, CartItem item) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> new Cart(userId)); // ✅ Create cart if not exists

        Optional<CartItem> existingItemOpt = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(item.getProductId()))
                .findFirst();

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            if (item.getQuantity() == 0) {
                cart.getItems().remove(existingItem); // 🧹 Remove item
            } else {
                // 🔄 Update all relevant fields
                existingItem.setQuantity(item.getQuantity());
                existingItem.setPrice(item.getPrice());
                existingItem.setProductimage(item.getProductimage()); // ✅ Fix: update image
                existingItem.setProductname(item.getProductname());   // (optional) update name
            }
        } else {
            if (item.getQuantity() > 0) {
                cart.getItems().add(item); // ➕ Add new item
            }
        }

        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    // Update quantity of an item
    public Cart updateItemQuantity(String userId, String productId, int newQuantity) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(newQuantity);
                break;
            }
        }

        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    // Remove an item from cart
    public Cart removeItem(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().removeIf(item -> item.getProductId() != null && productId.equals(item.getProductId()));

        cart.calculateTotalAmount();
        return cartRepository.save(cart);
    }

    // Clear the entire cart
    public Cart clearCart(String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.setItems(new ArrayList<>());
        cart.setTotalAmount(0.0);
        return cartRepository.save(cart);
    }
}
