package com.thesis.backend.dto;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class ItemDTO {
    private String name;
    private BigDecimal price;
    private String sizeName;
    private String pictureUrl;
}