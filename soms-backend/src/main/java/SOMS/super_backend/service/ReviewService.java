package SOMS.super_backend.service;

import SOMS.super_backend.entity.Review;
import SOMS.super_backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Service
@RestController

public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // 🔹 Add a new review
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    // 🔹 Get all reviews for a product
    public List<Review> getReviewsByProduct(String productId) {
        return reviewRepository.findByProductId(productId);
    }

    // 🔹 Get all reviews by a user
    public List<Review> getReviewsByUser(String userId) {
        return reviewRepository.findByUserId(userId);
    }

    // 🔹 Delete a review by ID
    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }

    // 🔹 Get a specific review by ID
    public Optional<Review> getReviewById(String id) {
        return reviewRepository.findById(id);
    }
}
