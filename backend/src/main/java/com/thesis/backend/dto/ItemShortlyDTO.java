package com.thesis.backend.dto;

import lombok.Data;

@Data
public class ItemShortlyDTO {
    private String name;
    private String description;
    private Double price;
    private String sellerUsername;
}