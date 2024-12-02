package com.thesis.backend.dto;

import lombok.Data;

import java.util.List;
@Data
public class CategoryDTO {
    private Long id;
    private String name;
    private List<CategoryDTO> subCategories;
}