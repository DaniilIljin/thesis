package com.thesis.backend.controller;

import com.thesis.backend.dto.ItemIdDTO;
import com.thesis.backend.dto.item.ItemAddDTO;
import com.thesis.backend.dto.item.ItemViewDTO;
import com.thesis.backend.dto.shop.ItemDTO;
import com.thesis.backend.service.ItemService;
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

    @PostMapping("/favorite")
    public void addFavorite(@RequestBody ItemIdDTO itemId) {
        itemService.toggleFavorite(itemId.getId());
    }

    @GetMapping("/favorites")
    public ResponseEntity<List<ItemDTO>> getFavorites() {
        List<ItemDTO> items = itemService.getAllUserFavorites();
        return ResponseEntity.ok(items);
    }

    @GetMapping("/favoriteIds")
    public ResponseEntity<List<Long>> getFavoritesIds() {
        List<Long> itemsIds = itemService.getAllUserFavoritesIds();
        return ResponseEntity.ok(itemsIds);
    }

    @GetMapping     
    public ResponseEntity<List<ItemDTO>> getAllUserItems() {
        List<ItemDTO> items = itemService.getAllUserItems();
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<ItemViewDTO> createItem(@RequestBody ItemAddDTO itemViewDTO) {
        ItemViewDTO createdItem = itemService.createItem(itemViewDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdItem);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id){
        itemService.deleteUserItem(id);
    }

}
