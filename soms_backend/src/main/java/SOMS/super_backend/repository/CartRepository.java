package SOMS.super_backend.repository;
import SOMS.super_backend.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CartRepository extends MongoRepository<Cart, String> {
    Optional<Cart> findByUserId(String userId); // Find cart by user ID
}

