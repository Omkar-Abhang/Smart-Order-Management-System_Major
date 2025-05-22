package SOMS.super_backend.controller.AdminControllers;

import SOMS.super_backend.DTO.FranchiseWithUserRequest;
import SOMS.super_backend.DTO.FranchiseWithUserResponse;
import SOMS.super_backend.entity.Franchise;
import SOMS.super_backend.entity.User;
import SOMS.super_backend.repository.FranchiseRepository;
import SOMS.super_backend.repository.UserRepository;
import SOMS.super_backend.security.CustomUserDetailsService;
import SOMS.super_backend.service.FranchiseService;
import SOMS.super_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;


import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/admin")
public class FranchiseController {

    @Autowired
    private FranchiseService franchiseService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @GetMapping("/health")
    public String health(){
        return "Admin Page Endpoints";
    }

    // 🔹 Create Franchise + StoreOwner
    @PostMapping("/addfranchise")
    public ResponseEntity<String> registerFranchiseWithStoreOwner(@RequestBody FranchiseWithUserRequest request) {
        try {
            franchiseService.createFranchiseWithStoreOwner(request);
            return ResponseEntity.ok("Franchise and Store Owner registered successfully.");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }


    @GetMapping("/allfranchise")
    public ResponseEntity<List<FranchiseWithUserResponse>> getAllFranchisesWithUser() {
        return ResponseEntity.ok(franchiseService.getAllFranchiseWithUser());
    }

//    // 🔹 Get franchise by ID
//    @GetMapping("/franchise/{id}")
//    public ResponseEntity<?> getFranchiseById(@PathVariable String id) {
//        return franchiseService.getFranchiseById(id)
//                .<ResponseEntity<?>>map(ResponseEntity::ok)
//                .orElse(ResponseEntity.badRequest().body("Franchise not found with ID: " + id));
//    }


    // 🔹 Update franchise
    @PutMapping("/franchise/update")
    public ResponseEntity<Franchise> updateFranchiseWithOwner(@RequestBody FranchiseWithUserRequest request) {
        try {
            Franchise updatedFranchise = franchiseService.updateFranchiseWithStoreOwner(request);
            return ResponseEntity.ok(updatedFranchise);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // or return error message in body
        }
    }




    // 🔹 Delete franchise
    @DeleteMapping("/franchise/{id}")
    public ResponseEntity<String> deleteFranchise(@PathVariable String id) {
        try {
            franchiseService.deleteFranchise(id);
            return ResponseEntity.ok("Franchise and associated store owner deleted successfully.");
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }


}
