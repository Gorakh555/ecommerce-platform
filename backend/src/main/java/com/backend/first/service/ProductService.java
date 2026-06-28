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

    public void update(Long id , Product updateProduct) {
        Product product = productrepo.findById(id).orElseThrow(()-> new RuntimeException("Product not found"));
        product.setName(updateProduct.getName());
        product.setPrice(updateProduct.getPrice());
        product.setQuantity(updateProduct.getQuantity());
        product.setDescription(updateProduct.getDescription());
        product.setBrand(updateProduct.getBrand());
        product.setCategory(updateProduct.getCategory());
        product.setDateOfManufacturing(updateProduct.getDateOfManufacturing());
        product.setDateOfExpiry(updateProduct.getDateOfExpiry());
        productrepo.save(product);
    }

    public void delete(Long id) {
        Product product = productrepo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        productrepo.delete(product);
    }
}
