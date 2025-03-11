package SOMS.super_backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "Products")
public class Product {
    @Id
    @Indexed(unique = true)
    private String id;
    private String name;
    private String description;
    private double price;
    private String category;
    private int stock;
    private String imageUrl;

}


