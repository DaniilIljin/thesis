package com.thesis.backend.service;

import com.thesis.backend.dto.PictureDTO;
import com.thesis.backend.dto.UserDTO;
import com.thesis.backend.dto.item.ItemAddDTO;
import com.thesis.backend.dto.item.ItemViewDTO;
import com.thesis.backend.dto.shop.ItemDTO;
import com.thesis.backend.mapper.ItemMapper;
import com.thesis.backend.mapper.MainMapper;
import com.thesis.backend.model.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final UnitOfWork unitOfWork;
    private final ItemMapper itemMapper;
    private final MainMapper mapper;

    public ItemViewDTO getItemById(Long id) {
        Item item = unitOfWork.getItemRepository().findById(id).orElseThrow(RuntimeException::new);
        return itemMapper.toItemViewDTO(item);
    }

    public List<ItemDTO> getAllUserItems(){
        User user = getUser();
        return unitOfWork.getItemRepository().findAllBySellerId(user.getId()).stream()
                .map(mapper::toItemDTO).toList();
    }

    public void deleteUserItem(Long id){
        User user = getUser();
        unitOfWork.getItemRepository().findById(id).ifPresent(item -> {
            if(item.getSeller().getId().equals(user.getId())){
                unitOfWork.getItemRepository().delete(item);
            } else {
                throw new IllegalArgumentException("You can only delete your own items.");
            }
        });
    }

    private User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = unitOfWork.getUserRepository().findByUsername(username).orElseThrow(RuntimeException::new);
        return user;
    }

    @Transactional
    public ItemViewDTO createItem(ItemAddDTO itemAddDTO) {
        // Authenticate and get the user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = unitOfWork.getUserRepository().findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create and populate the item
        Item item = new Item();
        item.setSeller(user);
        item.setName(itemAddDTO.getName());
        item.setPrice(itemAddDTO.getPrice());
        item.setDescription(itemAddDTO.getDescription());
        item.setPictures(new ArrayList<>());

        // Handle picture files (uploaded to S3 or similar)
        if (itemAddDTO.getPictures() != null) {
            for (PictureDTO pictureDTO : itemAddDTO.getPictures()) {
                Picture picture = new Picture();
                picture.setItem(item);

                // Assuming file is uploaded to S3, we store the file name or URL
                // You need to upload the actual file and get the URL or file name for storage
                String fileName = pictureDTO.getFileName(); // Assuming this is the name of the file in S3
                picture.setFileName(fileName);
            }
        }

        // Set category (if provided)
        if (itemAddDTO.getCategoryId() != null) {
            Category category = unitOfWork.getCategoryRepository()
                    .findById(itemAddDTO.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Category ID not found"));
            item.setCategory(category);
        } else {
            throw new IllegalArgumentException("Category ID is required.");
        }

        // Set brand, size (if provided)
        if (itemAddDTO.getBrandId() != null) {
            Brand brand = unitOfWork.getBrandRepository()
                    .findById(itemAddDTO.getBrandId())
                    .orElseThrow(() -> new IllegalArgumentException("Brand ID not found"));
            item.setBrand(brand);
        }

        if (itemAddDTO.getSizeId() != null) {
            Size size = unitOfWork.getSizeRepository()
                    .findById(itemAddDTO.getSizeId())
                    .orElseThrow(() -> new IllegalArgumentException("Size ID not found"));
            item.setSize(size);
        }

        // Save the item
        Item savedItem = unitOfWork.getItemRepository().save(item);

        System.out.println("-----------------------------------------------------------------------------------");
        System.out.println(savedItem.getPictures());

        // Map the saved item to a DTO
        return itemMapper.toItemViewDTO(savedItem);
    }


    public void toggleFavorite(Long itemId) {
        User user = getUser();
        Optional<Item> item = unitOfWork.getItemRepository().findById(itemId);
        if (item.isPresent()){
            LikedItem likedItem = unitOfWork.getLikedItemRepository().findByItemIdAndBuyerId(itemId, user.getId());
            if (likedItem != null){
                unitOfWork.getLikedItemRepository().delete(likedItem);
            } else {
                LikedItem newLikedItem = new LikedItem();
                newLikedItem.setItem(item.get());
                newLikedItem.setBuyer(user);
                unitOfWork.getLikedItemRepository().save(newLikedItem);
            }
        } else {
            throw new IllegalArgumentException("Item not found.");
        }
    }

    public List<ItemDTO> getAllUserFavorites() {
        User user = getUser();
        List<Item> likedItems = unitOfWork.getLikedItemRepository().findLikedItemsByUserId(user.getId());
        return likedItems.stream()
                .map(mapper::toItemDTO).toList();
    }

    public List<Long> getAllUserFavoritesIds() {
        User user = getUser();
        return unitOfWork.getLikedItemRepository().findLikedItemsIdsByUserId(user.getId());
    }

    public UserDTO getUserContacts (Long itemId){
        User user = unitOfWork.getItemRepository().findItemUser(itemId);
        return mapper.toUserDTO(user);
    }
}
