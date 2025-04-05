package SOMS.super_backend.service;

import SOMS.super_backend.entity.Franchise;
import SOMS.super_backend.repository.FranchiseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Service
@RestController
public class FranchiseService {

    @Autowired
    private FranchiseRepository franchiseRepository;

    // 🔹 Create or Update a Franchise
    public Franchise createOrUpdateFranchise(Franchise franchise) {
        return franchiseRepository.save(franchise);
    }

    // 🔹 Get All Franchises
    public List<Franchise> getAllFranchises() {
        return franchiseRepository.findAll();
    }

    // 🔹 Get Franchise by ID
    public Optional<Franchise> getFranchiseById(String id) {
        return franchiseRepository.findById(id);
    }

    // 🔹 Get Franchise by Name
    public Optional<Franchise> getFranchiseByName(String name) {
        return franchiseRepository.findByName(name);
    }

    // 🔹 Delete Franchise by ID
    public void deleteFranchise(String id) {
        franchiseRepository.deleteById(id);
    }

    // 🔹 Update Franchise Status (ACTIVE / INACTIVE)
    public Franchise updateFranchiseStatus(String id, String status) {
        Optional<Franchise> franchiseOpt = franchiseRepository.findById(id);
        if (franchiseOpt.isPresent()) {
            Franchise franchise = franchiseOpt.get();
            franchise.setStatus(status);
            return franchiseRepository.save(franchise);
        }
        return null; // Or throw an exception
    }
}
