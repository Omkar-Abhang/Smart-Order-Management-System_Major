package SOMS.super_backend.DTO;

import lombok.Data;

@Data
public class FranchiseWithUserRequest {
    // Franchise fields
    private String franchiseName;
    private String location;

    // Store Owner fields
    private String ownerName;
    private String phone;
    private String ownerEmail;
    private String password;
    private String status;
}
