package SOMS.super_backend.controller;

import SOMS.super_backend.entity.Order;
import SOMS.super_backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/placeOrder")
    public Order placeOrder(@RequestBody Order order) {
        return customerService.placeOrder(order);
    }

    @GetMapping("/orders/{userId}")
    public List<Order> getOrdersByUser(@PathVariable String userId) {
        return customerService.getOrdersByUser(userId);
    }
}

