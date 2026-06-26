package com.backend.first.service;

import com.backend.first.entity.Product;
import com.backend.first.repository.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    ProductRepo productrepo;
    public ProductService(ProductRepo productrepo){
        this.productrepo=productrepo;
    }
    public List<Product> getProducts() {
        return productrepo.findAll();
    }

    public void addProduct(Product product){
        productrepo.save(product);
    }
}
