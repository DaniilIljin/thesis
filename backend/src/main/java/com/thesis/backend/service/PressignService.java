package com.thesis.backend.service;

import com.thesis.backend.dto.FileNamesDTO;
import com.thesis.backend.dto.FilePresignedUrlDTO;
import com.thesis.backend.model.User;
import com.thesis.backend.repository.PictureRepository;
import com.thesis.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PressignService {

    private final S3Presigner presigner;

    private final UserRepository userRepository;

    private final PictureRepository pictureRepository;

    @Value("${BUCKET_NAME}")
    private String bucket;

    private User getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow(RuntimeException::new);
        return user;
    }

    public List<FilePresignedUrlDTO> getPreSignedUrlsWithFilenames(FileNamesDTO fileNames) {
        return fileNames.getFileNames().stream()
                .map(fileName -> {
                    GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                            .bucket(bucket)
                            .key(fileName)
                            .build();

                    GetObjectPresignRequest getObjectPresignRequest = GetObjectPresignRequest.builder()
                            .signatureDuration(Duration.ofMinutes(60))
                            .getObjectRequest(getObjectRequest)
                            .build();

                    String url = presigner.presignGetObject(getObjectPresignRequest).url().toString();
                    return new FilePresignedUrlDTO(fileName, url);
                })
                .toList();
    }


    public List<FilePresignedUrlDTO> putPreSignedUrlsWithFilenames(FileNamesDTO fileNames) {
        User user = getUser();
        List<FilePresignedUrlDTO> presignedUrls = new ArrayList<>();

        for (String fileName : fileNames.getFileNames()) {
            String newFilename = String.format("%s/%s", user.getUsername(), fileName);

//            if (pictureRepository.findPictureByFileName(newFilename).isPresent()) {
//                continue;
//            }

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(newFilename)
                    .build();

            PutObjectPresignRequest putObjectPresignRequest = PutObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(5))
                    .putObjectRequest(putObjectRequest)
                    .build();

            String url = presigner.presignPutObject(putObjectPresignRequest).url().toString();
            presignedUrls.add(new FilePresignedUrlDTO(newFilename, url));
        }

        return presignedUrls;
    }


}