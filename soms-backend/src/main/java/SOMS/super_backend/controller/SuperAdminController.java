package SOMS.super_backend.controller;

import SOMS.super_backend.entity.Franchise;
import SOMS.super_backend.service.SuperAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/superadmin")
public class SuperAdminController {
    @Autowired
    private SuperAdminService superAdminService;

    @PostMapping("/addFranchise")
    public Franchise addFranchise(@RequestBody Franchise franchise) {
        return superAdminService.addFranchise(franchise);
    }

    @GetMapping("/franchises")
    public List<Franchise> getAllFranchises() {
        return superAdminService.getAllFranchises();
    }
}

