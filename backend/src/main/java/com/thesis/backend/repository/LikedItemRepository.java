package com.thesis.backend.repository;

import com.thesis.backend.model.LikedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource
// Repository for LikedItem
public interface LikedItemRepository extends JpaRepository<LikedItem, Long> {
}
