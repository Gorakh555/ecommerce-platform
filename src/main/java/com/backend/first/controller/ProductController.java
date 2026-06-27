package com.backend.first.controller;

import com.backend.first.entity.Product;
import com.backend.first.entity.Users;
import com.backend.first.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productservice;

    public ProductController(ProductService productservice){
        this.productservice=productservice;
    }
    @GetMapping("/")
    public List<Product> getProduct(){
        return productservice.getProducts();
    }

    @GetMapping("/session")
    public String Session(HttpServletRequest request){
        return "WELCOME"+request.getSession().getId();
    }

    @PutMapping("/{id}")
    public void update(@PathVariable Long id ,@RequestBody Product updateProduct){
        productservice.update(id,updateProduct);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        productservice.delete(id);
    }

//    @GetMapping("/csrf-token")
//    public CsrfToken getToken(HttpServletRequest request){
//        return (CsrfToken) request.getAttribute("_csrf");
//    }

    @PostMapping("/product")
    public void addProduct(@RequestBody Product product){
        productservice.addProduct(product);
    }
}

