package SOMS.super_backend.controller.StoreOwnerControllers;

import SOMS.super_backend.entity.Franchise;
import SOMS.super_backend.entity.Inventory;
import SOMS.super_backend.service.FranchiseService;
import SOMS.super_backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storeowner/inventory")
public class InventoryEndpoints {

    @Autowired
    private InventoryService inventoryService;

    @Autowired
    private FranchiseService franchiseService;


    @GetMapping("/by-user/{userId}")
    public ResponseEntity<Franchise> getFranchiseByUserId(@PathVariable String userId) {
        Franchise franchise = franchiseService.getFranchiseByUserId(userId);
        return ResponseEntity.ok(franchise);
    }

    public InventoryEndpoints(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // 🔹 StoreOwner - Create new inventory request
    @PostMapping("/request")
    public ResponseEntity<Inventory> createInventoryRequest(@RequestBody Inventory inventory) {
        Inventory created = inventoryService.createInventoryRequest(inventory);
        return ResponseEntity.ok(created);
    }

    // 🔹 StoreOwner - View their requests by franchiseId
    @GetMapping("/franchise/{franchiseId}")
    public ResponseEntity<List<Inventory>> getInventoryRequestsByFranchiseId(@PathVariable String franchiseId) {
        List<Inventory> list = inventoryService.getInventoryRequestsByFranchiseId(franchiseId);
        return ResponseEntity.ok(list);
    }
}
