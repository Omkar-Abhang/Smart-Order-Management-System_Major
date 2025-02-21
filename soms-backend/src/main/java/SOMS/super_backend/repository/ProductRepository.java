package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}

