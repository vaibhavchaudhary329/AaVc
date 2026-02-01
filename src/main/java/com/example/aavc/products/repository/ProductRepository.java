package com.example.aavc.products.repository;

import com.example.aavc.products.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByIsActiveTrue();

    List<Product> findByCategoryIdAndIsActiveTrue(Long categoryId);

    List<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String keyword);
}
