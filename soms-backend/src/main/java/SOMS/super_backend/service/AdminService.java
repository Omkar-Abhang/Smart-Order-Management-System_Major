package SOMS.super_backend.service;

import SOMS.super_backend.entity.Order;
import SOMS.super_backend.entity.Product;
import SOMS.super_backend.repository.OrderRepository;
import SOMS.super_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}

