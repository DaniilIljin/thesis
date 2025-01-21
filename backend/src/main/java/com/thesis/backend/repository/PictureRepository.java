package com.thesis.backend.repository;

import com.thesis.backend.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
    Optional<Picture> findPictureByFileName(String fileName);
}
