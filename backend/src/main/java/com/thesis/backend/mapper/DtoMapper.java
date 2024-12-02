package com.thesis.backend.mapper;

import com.thesis.backend.dto.BrandDTO;
import com.thesis.backend.dto.CategoryDTO;
import com.thesis.backend.dto.ItemDTO;
import com.thesis.backend.dto.SizeDTO;
import com.thesis.backend.model.Brand;
import com.thesis.backend.model.Category;
import com.thesis.backend.model.Item;
import com.thesis.backend.model.Size;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DtoMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public BrandDTO toBrandDTO(Brand brand) {
        return modelMapper.map(brand, BrandDTO.class);
    }

    public SizeDTO toSizeDTO(Size size) {
        return modelMapper.map(size, SizeDTO.class);
    }

    public CategoryDTO toCategoryDTO(Category category) {
        return modelMapper.map(category, CategoryDTO.class);
    }

    public ItemDTO toItemDTO(Item item) {
        return modelMapper.map(item, ItemDTO.class);
    }
}
