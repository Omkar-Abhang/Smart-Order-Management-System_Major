package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Franchise;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FranchiseRepository extends MongoRepository<Franchise, String> {
}

