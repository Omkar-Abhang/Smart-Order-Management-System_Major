package SOMS.super_backend.repository;

import SOMS.super_backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByPhone(String phone); // Find user by phone (for OTP login)
    Optional<User> findByEmail(String email); // Find user by email
    Optional<User> findByFranchiseId(String franchiseId);
    boolean existsByPhone(String phone); // Check if Phone already exists
    boolean existsByEmail(String email); // Check if Email already exists
    Optional<User> findById(String id);


}
