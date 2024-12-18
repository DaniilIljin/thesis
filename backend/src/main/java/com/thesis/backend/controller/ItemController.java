package com.thesis.backend.controller;

import com.thesis.backend.dto.item.ItemAddDTO;
import com.thesis.backend.dto.item.ItemViewDTO;
import com.thesis.backend.dto.shop.ItemDTO;
import com.thesis.backend.service.ItemService;
import com.thesis.backend.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    private final MainService mainService;

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getAllItems() {
        List<ItemDTO> items = mainService.getAllItems();
        return ResponseEntity.ok(items);
    }

    @PostMapping("/save")
    public ResponseEntity<ItemViewDTO> createItem(@RequestBody ItemAddDTO itemViewDTO) {
        ItemViewDTO createdItem = itemService.createItem(itemViewDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
    }
}
