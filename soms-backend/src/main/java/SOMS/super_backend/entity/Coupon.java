package SOMS.super_backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "Coupons")
public class Coupon {
    @Id
    private String id;

    @Indexed(unique = true)
    private String code; // Unique Coupon Code

    private String discountType; // PERCENTAGE, FLAT
    private double discountValue;
    private double minimumOrderAmount;
    private String validFrom;
    private String validTill;
    private int usageLimit;
    private List<String> usedBy;
}
