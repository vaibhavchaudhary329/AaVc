package com.example.aavc.products.repository;

import com.example.aavc.products.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByIsActiveTrue();

    List<Product> findByCategoryIdAndIsActiveTrue(Long categoryId);

    List<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String keyword);
}
