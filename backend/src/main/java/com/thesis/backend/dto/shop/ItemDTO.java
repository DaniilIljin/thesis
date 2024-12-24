package com.thesis.backend.dto.shop;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class ItemDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private String sizeName;
    private String brandName;
    private String pictureUrl;
}