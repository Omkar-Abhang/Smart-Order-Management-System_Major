package SOMS.super_backend.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "Users")
public class User {
    @Id
    private String id;

    private String role; // Customer, Store-Owner, Admin

    private String name;

    @Indexed(unique = true)
    private String phone; // Unique, used for OTP login

    @Indexed(unique = true)
    private String email; // Unique, used for notifications

    private String password; // Only for Admin/SuperAdmin, Customers use OTP

    private String address;

    private List<String> orderIds; // Stores order IDs as strings
    private String franchiseId;



 

}

