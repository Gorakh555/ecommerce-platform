package com.backend.first.controller;

import com.backend.first.entity.Product;
import com.backend.first.service.ProductService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {
    private final ProductService productservice;

    public ProductController(ProductService productservice){
        this.productservice=productservice;
    }
    @GetMapping("/products")
    public List<Product> getProduct(){
        return productservice.getProducts();
    }

    @GetMapping("/")
    public String Session(HttpServletRequest request){
        return "WELCOME"+request.getSession().getId();
    }

    @GetMapping("/csrf-token")
    public CsrfToken getToken(HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }

    @PostMapping("/product")
    public void addProduct(@RequestBody Product product){
        productservice.addProduct(product);
    }
}

