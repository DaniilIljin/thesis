package com.thesis.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthenticationResponse {

    @JsonProperty("token")
    private String token;
}
