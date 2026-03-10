package com.example.aavc.products.controller;

import com.example.aavc.products.dto.ProductRequest;
import com.example.aavc.products.dto.ProductResponse;
import com.example.aavc.products.entity.Product;
import com.example.aavc.products.repository.ProductRepository;
import com.example.aavc.products.service.ProductService;
import com.example.aavc.products.service.ProductSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "${APP_CORS_ALLOWED_ORIGIN}")
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;

    // ------------------ Public APIs ------------------

    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductResponse getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductResponse> getProductsByCategory(@PathVariable("categoryId") Long categoryId) {
        return productService.getProductsByCategory(categoryId);
    }

    @GetMapping("/search")
    public List<ProductResponse> searchProducts(@RequestParam("q") String q) {
        return productService.searchProducts(q);
    }

    // ------------------ Admin APIs ------------------

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody ProductRequest request) {
        return productService.createProduct(request);
    }

    @PutMapping("/{id}")
    public ProductResponse updateProduct(@PathVariable Long id,
                                         @RequestBody ProductRequest request) {
        return productService.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }

    @PutMapping("/{id}/stock")
    public void updateStock(@PathVariable Long id,
                            @RequestParam Integer stock) {
        productService.updateStock(id, stock);
    }

    // --- UPDATED SEARCH/FILTER ENDPOINT ---
    @GetMapping("/sort")
    public ResponseEntity<Page<ProductResponse>> searchProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) List<String> brands,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(defaultValue = "best_match") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        // 1. Map the sort string to actual Sort object
        Sort sortOrder = switch (sort) {
            case "price_low" -> Sort.by("price").ascending();
            case "price_high" -> Sort.by("price").descending();
            case "best_seller" -> Sort.by("salesCount").descending();
            case "highly_rated" -> Sort.by("rating").descending();
            default -> Sort.by("id").descending();
        };

        Pageable pageable = PageRequest.of(page, size, sortOrder);

        // 2. Execute dynamic query
        Specification<Product> spec = ProductSpecifications.buildQuery(q, brands, minPrice, maxPrice);

        // 3. Fetch from DB and Map to Response DTO immediately to avoid Proxy errors
        Page<ProductResponse> response = productRepository.findAll(spec, pageable)
                .map(this::convertToResponse);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/brands")
    public ResponseEntity<List<String>> getBrands() {
        return ResponseEntity.ok(productService.getAllBrands());
    }

    // --- HELPER METHOD FOR MAPPING ---
    private ProductResponse convertToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .imageUrl(product.getImageUrl())
                .brand(product.getBrand())
                .rating(product.getRating())
                .salesCount(product.getSalesCount())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .build();
    }
}