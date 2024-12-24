package com.thesis.backend.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String username;   // Username
    private String fullName;   // Full name of the user
    private String email;      // Email address
    private String phone; // Contact phone number
}
