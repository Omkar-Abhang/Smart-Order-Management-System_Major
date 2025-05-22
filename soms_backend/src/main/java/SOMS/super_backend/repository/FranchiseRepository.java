package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Franchise;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface FranchiseRepository extends MongoRepository<Franchise, String> {
    Optional<Franchise> findByName(String name); // Find franchise by unique name
//    List<Franchise> findByUserId(String userId); //
    Optional<Franchise> findByUserId(String userId);  // ✅ returns Optional
// Find all franchises managed by an admin (userId corresponds to adminId)
}

