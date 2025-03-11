package SOMS.super_backend.service;

import SOMS.super_backend.entity.Product;
import SOMS.super_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Service
@RestController

public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // 🔹 Add or Update Product
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    // 🔹 Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // 🔹 Get Product by ID
    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    // 🔹 Get Products by Category
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    // 🔹 Get Products in Price Range
    public List<Product> getProductsByPriceRange(double minPrice, double maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice);
    }

    // 🔹 Delete Product by ID
    public boolean deleteProductById(String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
