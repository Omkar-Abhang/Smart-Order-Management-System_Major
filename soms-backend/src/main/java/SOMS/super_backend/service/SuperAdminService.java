package SOMS.super_backend.service;

import SOMS.super_backend.entity.Franchise;
import SOMS.super_backend.repository.FranchiseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuperAdminService {
    @Autowired
    private FranchiseRepository franchiseRepository;

    public Franchise addFranchise(Franchise franchise) {
        return franchiseRepository.save(franchise);
    }

    public List<Franchise> getAllFranchises() {
        return franchiseRepository.findAll();
    }
}

