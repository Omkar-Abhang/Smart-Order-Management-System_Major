package SOMS.super_backend.controller.CustomerControllers;


import SOMS.super_backend.entity.Order;
import SOMS.super_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/customer/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // 🔹 Create order from cart
    @PostMapping("/checkout")
    public Order checkoutOrder(@RequestBody Order orderRequest) {
        orderRequest.setOrderStatus("PENDING");
        orderRequest.setPaymentStatus(
                orderRequest.getPaymentMethod().equalsIgnoreCase("Cash on Delivery") ? "PENDING" : "COMPLETED"
        );
        orderRequest.setOrderDate(LocalDateTime.now());

        return orderService.createOrUpdateOrder(orderRequest);
    }


    // 🔹 Get orders by user
    @GetMapping("/{userId}")
    public List<Order> getOrdersByUser(@PathVariable String userId) {
        return orderService.getOrdersByUserId(userId);
    }
}
