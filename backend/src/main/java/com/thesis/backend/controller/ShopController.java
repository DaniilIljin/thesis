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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/shop")
@RequiredArgsConstructor
public class ShopController {

    private final MainService mainService;

    private final ItemService itemService;

    @GetMapping("/items")
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        List<ItemDTO> items = mainService.getAllItems();
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
