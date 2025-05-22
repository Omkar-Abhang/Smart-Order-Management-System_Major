package SOMS.super_backend.controller.StoreOwnerControllers;

import SOMS.super_backend.entity.Product;
import SOMS.super_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/storeowner")
public class ProductEndpoints {

    @Autowired
    private ProductService productService;

    @GetMapping("/check")
    public String health(){
        return "store Owner page ";
    }

    //    1.Products Endpoints
    //    Add Products
    @PostMapping("/addProduct")
    public ResponseEntity<String> addProduct(@RequestBody Product product){
        productService.saveProduct(product);
        return ResponseEntity.ok("Product added successfully!");
    }

    //    Get All Product
    @GetMapping("/getProduct")
    public List<Product> getAllProduct(){
        return productService.getAllProducts();
    }

    // Update product by ID
    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product updatedProduct) {
        Optional<Product> existingProductOpt = productService.getProductById(id);

        if (existingProductOpt.isPresent()) {
            Product existingProduct = existingProductOpt.get();

            // Update product fields
            existingProduct.setName(updatedProduct.getName());
            existingProduct.setDescription(updatedProduct.getDescription());
            existingProduct.setPrice(updatedProduct.getPrice());
            existingProduct.setCategory(updatedProduct.getCategory());
            existingProduct.setStock(updatedProduct.getStock());
            existingProduct.setImageUrl(updatedProduct.getImageUrl());

            Product savedProduct = productService.saveProduct(existingProduct);
            return ResponseEntity.ok(savedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete product by ID
    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id) {
        boolean deleted = productService.deleteProductById(id);
        if (deleted) {
            return ResponseEntity.ok("Product deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
