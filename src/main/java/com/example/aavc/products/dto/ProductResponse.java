package com.example.aavc.products.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;
    private String categoryName;
    private Long categoryId;

    // Include new fields for the frontend
    private String brand;
    private Double rating;
    private Integer salesCount;
}
