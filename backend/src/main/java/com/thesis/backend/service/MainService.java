package com.thesis.backend.service;

import com.thesis.backend.dto.BrandDTO;
import com.thesis.backend.dto.SizeDTO;
import com.thesis.backend.dto.item.CategoryViewDTO;
import com.thesis.backend.dto.shop.CategoryDTO;
import com.thesis.backend.dto.shop.ItemDTO;
import com.thesis.backend.mapper.MainMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
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

    public List<CategoryDTO> getAllCategoriesTree() {
        return unitOfWork.getCategoryRepository().findAllTopCategories().stream()
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

    public List<ItemDTO> getSortedItems(Long categoryId, Long brandId, String sortDirection, String searchQuery) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), "price");
        if (brandId != null) {
            return unitOfWork.getItemRepository().findByBrandId(brandId, sort).stream()
                    .map(mapper::toItemDTO).toList();
        }
        if (categoryId != null) {
            return unitOfWork.getItemRepository().findByCategoryId(categoryId, sort).stream()
                    .map(mapper::toItemDTO).toList();
        }

        if (searchQuery != null) {
            return unitOfWork.getItemRepository().findByNameOrBrandNameOrCategoryNameOrSizeName(searchQuery, sort).stream()
                    .map(mapper::toItemDTO).toList();
        }

        return unitOfWork.getItemRepository().findAll(sort).stream()
                .map(mapper::toItemDTO).toList();
    }

    public List<CategoryViewDTO> getAllCategories() {
        return unitOfWork.getCategoryRepository().findAll().stream()
                .map(mapper::toCategoryViewDTO).toList();
    }
}