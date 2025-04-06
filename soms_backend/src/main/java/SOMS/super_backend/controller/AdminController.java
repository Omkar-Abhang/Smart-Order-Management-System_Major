package SOMS.super_backend.controller;

import SOMS.super_backend.service.FranchiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

@Autowired
private FranchiseService franchiseService;

    @GetMapping("/check")
    public String sAdminHealth(){
        return " Admin Page";
    }


}

