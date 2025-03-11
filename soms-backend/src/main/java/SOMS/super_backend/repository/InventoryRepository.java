package SOMS.super_backend.repository;

import SOMS.super_backend.entity.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface InventoryRepository extends MongoRepository<Inventory, String> {
    List<Inventory> findByFranchiseId(String franchiseId); // Find inventories by franchise ID
    List<Inventory> findByStatus(String status); // Find inventories by status (PENDING, APPROVED, etc.)
}
