package com.example.aavc.products.repository;

import com.example.aavc.products.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByIsActiveTrue();

    List<Product> findByCategoryIdAndIsActiveTrue(Long categoryId);

    List<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String keyword);

    // Simple search: checks if name contains the query (case-insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Advanced search: checks both name and description
    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchProducts(@Param("query") String query);
}
