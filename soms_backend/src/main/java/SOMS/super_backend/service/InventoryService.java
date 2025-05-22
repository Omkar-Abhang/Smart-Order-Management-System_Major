package SOMS.super_backend.service;

import SOMS.super_backend.entity.Inventory;
import SOMS.super_backend.repository.FranchiseRepository;
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

    @Autowired
    private FranchiseRepository franchiseRepository;




    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    // StoreOwner creates a new inventory request
    public Inventory createInventoryRequest(Inventory inventory) {
        inventory.setStatus("PENDING");
        return inventoryRepository.save(inventory);
    }

    // Admin updates status of inventory request
    public Inventory updateInventoryStatus(String inventoryId, String status) {
        Optional<Inventory> inventoryOpt = inventoryRepository.findById(inventoryId);
        if (inventoryOpt.isEmpty()) {
            throw new RuntimeException("Inventory request not found");
        }
        Inventory inventory = inventoryOpt.get();
        inventory.setStatus(status);
        return inventoryRepository.save(inventory);
    }

    // StoreOwner fetches all their inventory requests by franchiseId
    public List<Inventory> getInventoryRequestsByFranchiseId(String franchiseId) {
        return inventoryRepository.findByFranchiseId(franchiseId);
    }

    // Admin fetches all inventory requests
    public List<Inventory> getAllInventoryRequests() {
        return inventoryRepository.findAll();
    }

    // Optional: Delete inventory request by ID (if needed)
    public void deleteInventoryRequest(String inventoryId) {
        inventoryRepository.deleteById(inventoryId);
    }
}
