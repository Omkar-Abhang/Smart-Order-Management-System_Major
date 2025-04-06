package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface ProductRepository extends MongoRepository<Product, String> {
    Optional<Product> findByName(String name); // Find product by unique name
    List<Product> findByCategory(String category); // Find products by category
    List<Product> findByPriceBetween(double minPrice, double maxPrice); // Find products in a price range
}

