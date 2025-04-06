package SOMS.super_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Document(collection = "Reviews")
public class Review {

    @Id
    private String id;         // Unique Review ID

    private String userId;     // The user who gave the review
    private String productId;  // The product being reviewed

    private double rating;     // Rating out of 5
    private String review;     // Review text

    private LocalDate reviewDate;  // Date of review
}
