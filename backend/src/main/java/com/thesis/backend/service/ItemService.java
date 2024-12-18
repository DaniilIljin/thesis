package com.thesis.backend.service;

import com.thesis.backend.dto.item.ItemAddDTO;
import com.thesis.backend.dto.item.ItemViewDTO;
import com.thesis.backend.dto.shop.ItemDTO;
import com.thesis.backend.mapper.ItemMapper;
import com.thesis.backend.mapper.MainMapper;
import com.thesis.backend.model.Category;
import com.thesis.backend.model.Item;
import com.thesis.backend.model.User;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = unitOfWork.getUserRepository().findByUsername(username).orElseThrow(RuntimeException::new);

        Item item = new Item();

        item.setSeller(user);

        item.setName(itemAddDTO.getName());
        item.setPrice(itemAddDTO.getPrice());


        if (itemAddDTO.getCategoryId() != null) {
            Category category = unitOfWork.getCategoryRepository()
                    .findById(itemAddDTO.getCategoryId()).get();

            String categoryName = category.getName();

            item.setCategory(category);
        } else {
            throw new IllegalArgumentException("Category ID is required.");
        }

        if (itemAddDTO.getBrandId() != null) {
            item.setBrand(unitOfWork.getBrandRepository().findById(itemAddDTO.getBrandId()).get());
        }

        if (itemAddDTO.getSizeId() != null) {
            item.setSize(unitOfWork.getSizeRepository().findById(itemAddDTO.getSizeId()).get());
        }

        return itemMapper.toItemViewDTO(unitOfWork.getItemRepository().save(item));
    }
}
