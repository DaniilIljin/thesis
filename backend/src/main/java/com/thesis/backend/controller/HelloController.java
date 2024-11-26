package com.thesis.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/demo")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello World");
    }
}