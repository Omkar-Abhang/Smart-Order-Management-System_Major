package SOMS.super_backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "Inventory")
public class Inventory {
    @Id
    private String id;

    private String franchiseId;
    private List<InventoryItem> items;
    private String status; // PENDING, APPROVED, REJECTED
}

@Data
class InventoryItem {
    private String productId;
    private int quantity;
}
