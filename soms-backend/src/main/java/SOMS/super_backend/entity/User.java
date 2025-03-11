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

    private String role; // CUSTOMER, ADMIN, SUPER_ADMIN

    private String name;

    @Indexed(unique = true)
    private String phone; // Unique, used for OTP login

    @Indexed(unique = true)
    private String email; // Unique, used for notifications

    private String password; // Only for Admin/SuperAdmin, Customers use OTP

    private List<Address> address;

    private List<String> orderIds; // Stores order IDs as strings

    // ✅ Method to check if user requires OTP login
    public boolean isOtpLogin() {
        return this.role.equalsIgnoreCase("CUSTOMER");
    }

    // ✅ Method to check if user requires username-password login
    public boolean isPasswordLogin() {
        return this.role.equalsIgnoreCase("ADMIN") || this.role.equalsIgnoreCase("SUPER_ADMIN");
    }

}

@Data
class Address {
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String contactNumber;
}
