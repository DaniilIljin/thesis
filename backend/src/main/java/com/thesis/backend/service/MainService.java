package com.thesis.backend.service;

import com.thesis.backend.dto.BrandDTO;
import com.thesis.backend.dto.SizeDTO;
import com.thesis.backend.dto.shop.CategoryDTO;
import com.thesis.backend.mapper.MainMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {

    private final UnitOfWork unitOfWork;

    private final MainMapper mapper;


    public List<com.thesis.backend.dto.shop.ItemDTO> getAllItems() {
        return unitOfWork.getItemRepository().findAll().stream()
                .map(mapper::toItemDTO).toList();
    }

    public List<CategoryDTO> getAllCategories() {
        return unitOfWork.getCategoryRepository().findAll().stream()
                .map(mapper::toCategoryDTO).toList();
    }

    public List<BrandDTO> getAllBrands() {
        return unitOfWork.getBrandRepository().findAll().stream()
                .map(mapper::toBrandDTO).toList();
    }

    public List<SizeDTO> getAllSizes() {
        return unitOfWork.getSizeRepository().findAll().stream()
                .map(mapper::toSizeDTO).toList();
    }
}