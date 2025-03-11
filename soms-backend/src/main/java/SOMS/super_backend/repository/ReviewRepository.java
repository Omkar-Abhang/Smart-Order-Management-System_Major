package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByProductId(String productId); // Get all reviews for a product
    List<Review> findByUserId(String userId); // Get all reviews by a user

}

