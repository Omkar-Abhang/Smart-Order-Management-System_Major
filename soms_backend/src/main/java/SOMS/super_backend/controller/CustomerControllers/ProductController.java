package SOMS.super_backend.controller.CustomerControllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import SOMS.super_backend.entity.*;
import SOMS.super_backend.security.JwtUtil;
import SOMS.super_backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer/product")
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private JwtUtil jwtUtil;


    //  Products Controller Endpoints
    @GetMapping("/get")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }


}
