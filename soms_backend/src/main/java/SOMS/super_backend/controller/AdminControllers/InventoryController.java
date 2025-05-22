package SOMS.super_backend.controller.AdminControllers;

import SOMS.super_backend.entity.Inventory;
import SOMS.super_backend.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    // 🔹 Admin - Get all inventory requests
    @GetMapping("/all")
    public ResponseEntity<List<Inventory>> getAllInventoryRequests() {
        List<Inventory> list = inventoryService.getAllInventoryRequests();
        return ResponseEntity.ok(list);
    }

    // 🔹 Admin - Update status of a request (APPROVED / REJECTED)
    @PutMapping("/{id}/status")
    public ResponseEntity<Inventory> updateInventoryStatus(
            @PathVariable String id,
            @RequestParam String status) {
        Inventory updated = inventoryService.updateInventoryStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}
