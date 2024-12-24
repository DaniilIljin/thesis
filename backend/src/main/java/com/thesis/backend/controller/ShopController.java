package com.thesis.backend.controller;

import com.thesis.backend.dto.BrandDTO;
import com.thesis.backend.dto.SizeDTO;
import com.thesis.backend.dto.item.ItemViewDTO;
import com.thesis.backend.dto.shop.CategoryDTO;
import com.thesis.backend.dto.shop.ItemDTO;
import com.thesis.backend.service.ItemService;
import com.thesis.backend.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop")
@RequiredArgsConstructor
public class ShopController {

    private final MainService mainService;

    private final ItemService itemService;

    @GetMapping("/items")
    public ResponseEntity<List<ItemDTO>>  getItemsByCategory(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long brandId,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(required = false) String searchQuery
    ) {
        List<ItemDTO> items = mainService.getSortedItems(categoryId, brandId, sortDirection, searchQuery);
        return ResponseEntity.ok(items);
    }


    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = mainService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/brands")
    public ResponseEntity<List<BrandDTO>> getAllBrands() {
        List<BrandDTO> brands = mainService.getAllBrands();
        return ResponseEntity.ok(brands);
    }

    @GetMapping("/sizes")
    public ResponseEntity<List<SizeDTO>> getAllSizes() {
        List<SizeDTO> sizes = mainService.getAllSizes();
        return ResponseEntity.ok(sizes);
    }

    @GetMapping("items/{id}")
    public ResponseEntity<ItemViewDTO> getItemById(@PathVariable Long id) {
        ItemViewDTO itemViewDTO = itemService.getItemById(id);
        return ResponseEntity.ok(itemViewDTO);
    }
}
