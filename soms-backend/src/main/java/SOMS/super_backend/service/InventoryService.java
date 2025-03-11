package SOMS.super_backend.service;

import SOMS.super_backend.entity.Inventory;
import SOMS.super_backend.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Service
@RestController

public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    // 🔹 Create or Update Inventory Request
    public Inventory createOrUpdateInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    // 🔹 Get All Inventory Requests
    public List<Inventory> getAllInventories() {
        return inventoryRepository.findAll();
    }

    // 🔹 Get Inventory Request by ID
    public Optional<Inventory> getInventoryById(String id) {
        return inventoryRepository.findById(id);
    }

    // 🔹 Get Inventory Requests for a Specific Franchise
    public List<Inventory> getInventoriesByFranchiseId(String franchiseId) {
        return inventoryRepository.findByFranchiseId(franchiseId);
    }

    // 🔹 Delete Inventory Request
    public void deleteInventory(String id) {
        inventoryRepository.deleteById(id);
    }

    // 🔹 Update Inventory Status (PENDING, APPROVED, REJECTED)
    public Inventory updateInventoryStatus(String id, String status) {
        Optional<Inventory> inventoryOpt = inventoryRepository.findById(id);
        if (inventoryOpt.isPresent()) {
            Inventory inventory = inventoryOpt.get();
            inventory.setStatus(status);
            return inventoryRepository.save(inventory);
        }
        return null; // Or throw an exception
    }
}
