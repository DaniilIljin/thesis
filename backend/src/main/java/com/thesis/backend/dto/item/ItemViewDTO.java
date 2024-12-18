package com.thesis.backend.dto.item;

import com.thesis.backend.dto.BrandDTO;
import com.thesis.backend.dto.PictureDTO;
import com.thesis.backend.dto.SizeDTO;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ItemViewDTO {
    private Long id;
    private String name;
    private CategoryViewDTO category;
    private BrandDTO brand;
    private SizeDTO size;
    private BigDecimal price;
    private String description;
    private String sellerName;
    private List<PictureDTO> pictures;
}