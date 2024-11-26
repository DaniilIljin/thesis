package com.thesis.backend.repository;

import com.thesis.backend.model.Picture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource
public interface PictureRepository extends JpaRepository<Picture, Long> {
}
