package com.thesis.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FilePresignedUrlDTO {
    private String fileName;
    private String url;
}