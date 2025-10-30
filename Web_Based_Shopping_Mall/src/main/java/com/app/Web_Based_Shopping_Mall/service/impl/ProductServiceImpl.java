package com.app.Web_Based_Shopping_Mall.service.impl;

import com.app.Web_Based_Shopping_Mall.entity.Product;
import com.app.Web_Based_Shopping_Mall.repository.ProductRepository;
import com.app.Web_Based_Shopping_Mall.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setSize(product.getSize());
        existing.setCategory(product.getCategory());
        existing.setQuantity(product.getQuantity());
        existing.setImageUrl(product.getImageUrl());
        return productRepository.save(existing);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
