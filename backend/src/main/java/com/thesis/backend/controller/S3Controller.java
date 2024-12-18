package com.thesis.backend.controller;

import com.thesis.backend.service.PressignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/s3")
@RequiredArgsConstructor
public class S3Controller {

    private final PressignService preAssignService;

    @GetMapping("/upload")
    public ResponseEntity<String> generateUploadPresignedUrl(@RequestParam String fileName) {
        return ResponseEntity.ok(preAssignService.putPreSignedUrl(fileName));
    }

    @GetMapping("/download")
    public ResponseEntity<String> generateDownloadPresignedUrl(@RequestParam String fileName) {
        return ResponseEntity.ok(preAssignService.getPreSignedUrl(fileName));
    }
}