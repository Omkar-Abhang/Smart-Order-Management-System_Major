package SOMS.super_backend.controller;

import SOMS.super_backend.entity.Order;
import SOMS.super_backend.entity.Product;
import SOMS.super_backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/addProduct")
    public Product addProduct(@RequestBody Product product) {
        return adminService.addProduct(product);
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return adminService.getAllOrders();
    }
}
