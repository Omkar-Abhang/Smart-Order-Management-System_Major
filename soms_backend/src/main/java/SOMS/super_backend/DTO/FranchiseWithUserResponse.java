package SOMS.super_backend.DTO;

import lombok.Data;

@Data
public class FranchiseWithUserResponse {
    // Franchise fields
    private String franchiseId;
    private String franchiseName;
    private String location;
    private String status;

    // Store Owner fields
    private String userId;
    private String ownerName;
    private String phone;
    private String ownerEmail;
}
