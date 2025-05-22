package SOMS.super_backend.controller.CustomerControllers;

import SOMS.super_backend.entity.Cart;
import SOMS.super_backend.entity.CartItem;
import SOMS.super_backend.security.JwtUtil;
import SOMS.super_backend.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping("/customer/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtUtil jwtUtil;

    //   Cart controller Endpoints
    // ✅ Extract userId (subject) from JWT
    private String extractUserIdFromToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            return jwtUtil.extractUserId(jwt);
        }
        throw new RuntimeException("JWT Token not found or invalid");
    }


    // ✅ Get current user's cart
    @GetMapping
    public ResponseEntity<?> getCart(HttpServletRequest request) {
        String userId = extractUserIdFromToken(request);
        return cartService.getCartByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Add or update item in cart
    @PostMapping("/add")
    public ResponseEntity<Cart> addOrUpdateItem(
            HttpServletRequest request,
            @RequestBody CartItem item
    ) {
        String userId = extractUserIdFromToken(request);
        Cart updatedCart = cartService.addOrUpdateItem(userId, item);
        return ResponseEntity.ok(updatedCart);
    }

    // ✅ Update quantity of a specific product
    @PutMapping("/update")
    public ResponseEntity<Cart> updateQuantity(
            HttpServletRequest request,
            @RequestParam String productId,
            @RequestParam int quantity
    ) {
        String userId = extractUserIdFromToken(request);
        Cart updatedCart = cartService.updateItemQuantity(userId, productId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    // ✅ Remove item from cart
    @DeleteMapping("/remove")
    public ResponseEntity<Cart> removeItem(
            HttpServletRequest request,
            @RequestParam String productId
    ) {
        String userId = extractUserIdFromToken(request);
        Cart updatedCart = cartService.removeItem(userId, productId);
        return ResponseEntity.ok(updatedCart);
    }

    // ✅ Clear entire cart
    @DeleteMapping("/clear")
    public ResponseEntity<Cart> clearCart(HttpServletRequest request) {
        String userId = extractUserIdFromToken(request);
        Cart clearedCart = cartService.clearCart(userId);
        return ResponseEntity.ok(clearedCart);
    }

}
