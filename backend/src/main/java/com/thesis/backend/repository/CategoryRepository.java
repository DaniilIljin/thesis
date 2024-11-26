package com.thesis.backend.repository;

import com.thesis.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource
// Repository for Category
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
