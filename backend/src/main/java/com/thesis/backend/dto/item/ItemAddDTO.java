package com.thesis.backend.dto.item;

import com.thesis.backend.dto.PictureDTO;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ItemAddDTO {
    private String name;
    private Long categoryId;
    private Long brandId;
    private Long sizeId;
    private BigDecimal price;
    private String description;
    private List<PictureDTO> pictures;
}
