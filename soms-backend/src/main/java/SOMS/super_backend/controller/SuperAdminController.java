package SOMS.super_backend.controller;

import SOMS.super_backend.entity.Franchise;
import SOMS.super_backend.service.FranchiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/superadmin")
public class SuperAdminController {

@Autowired
private FranchiseService franchiseService;

    @GetMapping("/check")
    public String sAdminHealth(){
        return "Super Admin Page";
    }


}

