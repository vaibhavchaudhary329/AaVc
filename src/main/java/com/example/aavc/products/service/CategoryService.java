package com.example.aavc.products.service;

import com.example.aavc.products.dto.CategoryRequest;
import com.example.aavc.products.dto.CategoryResponse;
import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    CategoryResponse createCategory(CategoryRequest request);
}