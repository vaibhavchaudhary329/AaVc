package com.example.aavc.products.service.impl;

import com.example.aavc.products.dto.CategoryRequest;
import com.example.aavc.products.dto.CategoryResponse;
import com.example.aavc.products.entity.Category;
import com.example.aavc.products.repository.CategoryRepository;
import com.example.aavc.products.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAllCategories() {
        log.info("Fetching all categories");
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {
        Category category = Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .build();

        Category savedCategory = categoryRepository.save(category);
        log.info("Category {} is saved", savedCategory.getId());
        return mapToResponse(savedCategory);
    }

    private CategoryResponse mapToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .imageUrl(category.getImageUrl())
                .build();
    }
}