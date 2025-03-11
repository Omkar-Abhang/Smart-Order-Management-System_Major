package SOMS.super_backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Franchises")
public class Franchise {
    @Id
    private String id;

    @Indexed(unique = true)
    private String name; // Unique Franchise Name

    private String location;
    private String adminId;
    private String contact;
    private String status; // ACTIVE, INACTIVE
}
