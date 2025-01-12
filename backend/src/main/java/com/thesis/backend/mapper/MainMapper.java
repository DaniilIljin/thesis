package com.thesis.backend.mapper;

import com.thesis.backend.dto.BrandDTO;
import com.thesis.backend.dto.SizeDTO;
import com.thesis.backend.dto.UserDTO;
import com.thesis.backend.dto.item.CategoryViewDTO;
import com.thesis.backend.dto.shop.CategoryDTO;
import com.thesis.backend.dto.shop.ItemDTO;
import com.thesis.backend.model.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MainMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public UserDTO toUserDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public BrandDTO toBrandDTO(Brand brand) {
        return modelMapper.map(brand, BrandDTO.class);
    }

    public SizeDTO toSizeDTO(Size size) {
        return modelMapper.map(size, SizeDTO.class);
    }

    public CategoryDTO toCategoryDTO(Category category) {
        return modelMapper.map(category, CategoryDTO.class);
    }

    public CategoryViewDTO toCategoryViewDTO(Category category) {
        return modelMapper.map(category, CategoryViewDTO.class);
    }

    public ItemDTO toItemDTO(Item item) {
        ItemDTO itemDTO = modelMapper.map(item, ItemDTO.class);
        if (!item.getPictures().isEmpty()) {
            itemDTO.setPictureFileName(item.getPictures().getFirst().getFileName());
        }
        return itemDTO;
    }
}
