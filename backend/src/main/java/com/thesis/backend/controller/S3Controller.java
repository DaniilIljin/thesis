package com.thesis.backend.controller;

import com.thesis.backend.dto.FileNamesDTO;
import com.thesis.backend.dto.FilePresignedUrlDTO;
import com.thesis.backend.service.PressignService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/s3")
@RequiredArgsConstructor
public class S3Controller {

    private final PressignService preAssignService;

    @PostMapping("/upload")
    public ResponseEntity<List<FilePresignedUrlDTO>> generateUploadPresignedUrls(@RequestBody FileNamesDTO fileNames) {
        List<FilePresignedUrlDTO> presignedUrls = preAssignService.putPreSignedUrlsWithFilenames(fileNames);
        return ResponseEntity.ok(presignedUrls);
    }


    @PostMapping("/download")
    public ResponseEntity<List<FilePresignedUrlDTO>> generateDownloadPresignedUrls(@RequestBody FileNamesDTO fileNames) {
        List<FilePresignedUrlDTO> presignedUrls = preAssignService.getPreSignedUrlsWithFilenames(fileNames);
        return ResponseEntity.ok(presignedUrls);
    }

}