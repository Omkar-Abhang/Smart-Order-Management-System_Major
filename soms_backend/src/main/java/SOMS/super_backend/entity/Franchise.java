package SOMS.super_backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Reference;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Franchises")
public class Franchise {
    @Id
    private String id;

    private String name;
    private String location;
    private String status; // ACTIVE / INACTIVE

    private String userId;
}
