package SOMS.super_backend.service;

import SOMS.super_backend.DTO.FranchiseWithUserRequest;
import SOMS.super_backend.DTO.FranchiseWithUserResponse;
import SOMS.super_backend.entity.Franchise;
import SOMS.super_backend.entity.User;
import SOMS.super_backend.repository.FranchiseRepository;
import SOMS.super_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RestController
public class FranchiseService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FranchiseRepository franchiseRepository;

    // 🔹 Create or Update Franchise
    public Franchise createOrUpdateFranchise(Franchise franchise) {
        return franchiseRepository.save(franchise);
    }



    public Franchise getFranchiseByUserId(String userId) {
        return franchiseRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Franchise not found for userId: " + userId));
    }

    // 🔹 Get All Franchises
    public List<FranchiseWithUserResponse> getAllFranchiseWithUser() {
        List<Franchise> franchises = franchiseRepository.findAll();
        List<FranchiseWithUserResponse> responseList = new ArrayList<>();

        for (Franchise franchise : franchises) {
            FranchiseWithUserResponse dto = new FranchiseWithUserResponse();
            dto.setFranchiseId(franchise.getId());
            dto.setFranchiseName(franchise.getName());
            dto.setLocation(franchise.getLocation());
            dto.setStatus(franchise.getStatus());

            // Now use userId from franchise to fetch user
            String userId = franchise.getUserId();
            if (userId != null) {  // <-- Null check here
                Optional<User> userOpt = userRepository.findById(userId);
                userOpt.ifPresent(user -> {
                    dto.setUserId(user.getId());
                    dto.setOwnerName(user.getName());
                    dto.setOwnerEmail(user.getEmail());
                    dto.setPhone(user.getPhone());
                });
            }

            responseList.add(dto);
        }

        return responseList;
    }



    // 🔹 Delete Franchise by ID
    public void deleteFranchise(String id) {
        if (franchiseRepository.existsById(id)) {
            Franchise franchise = franchiseRepository.findById(id).orElseThrow();
            if (franchise.getUserId() != null) {
                userRepository.deleteById(franchise.getUserId());
            }
            franchiseRepository.deleteById(id);
        } else {
            throw new RuntimeException("Franchise not found with ID: " + id);
        }
    }


    // 🔹 Register Franchise + StoreOwner from DTO (optional reuse)
    public Franchise createFranchiseWithStoreOwner(FranchiseWithUserRequest request) {

        // 1. Check if user already exists
        if (userRepository.findByEmail(request.getOwnerEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // 2. Create store owner user (no franchiseId yet)
        User storeOwner = new User();
        storeOwner.setName(request.getOwnerName());
        storeOwner.setEmail(request.getOwnerEmail());
        storeOwner.setPhone(request.getPhone());
        storeOwner.setRole("StoreOwner");
        storeOwner.setPassword(passwordEncoder.encode(request.getPassword()));
        storeOwner = userRepository.save(storeOwner);

        // 3. Create and save franchise (with userId)
        Franchise franchise = new Franchise();
        franchise.setName(request.getFranchiseName());
        franchise.setLocation(request.getLocation());
        franchise.setStatus(request.getStatus());
        franchise.setUserId(storeOwner.getId());
        franchise = franchiseRepository.save(franchise); // 🔥 IMPORTANT: save here to get ID

        // 4. Update store owner with franchiseId now that it's generated
        storeOwner.setFranchiseId(franchise.getId());
        userRepository.save(storeOwner);

        return franchise;
    }

    public Franchise updateFranchiseWithStoreOwner(FranchiseWithUserRequest request) {
        // 1. Fetch existing franchise by ID
        Franchise franchise = franchiseRepository.findById(request.getFranchiseName())
                .orElseThrow(() -> new RuntimeException("Franchise not found with ID: " + request.getFranchiseName()));

        // 2. Fetch existing store owner user by ID
        User storeOwner = userRepository.findByEmail(request.getOwnerEmail())
                .orElseThrow(() -> new RuntimeException("Store owner not found with ID: " + request.getOwnerEmail()));

        // 3. Update franchise fields
        franchise.setName(request.getFranchiseName());
        franchise.setLocation(request.getLocation());
        franchise.setStatus(request.getStatus());

        // 4. Update store owner fields
        storeOwner.setName(request.getOwnerName());
        storeOwner.setPhone(request.getPhone());

        // For email update, check if new email is already taken by someone else
        if (!storeOwner.getEmail().equals(request.getOwnerEmail())) {
            if (userRepository.findByEmail(request.getOwnerEmail()).isPresent()) {
                throw new RuntimeException("Email already exists");
            }
            storeOwner.setEmail(request.getOwnerEmail());
        }

        // Password update only if provided (not null or empty)
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            storeOwner.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // 5. Save updated franchise and store owner
        franchiseRepository.save(franchise);
        userRepository.save(storeOwner);

        return franchise;
    }

}
