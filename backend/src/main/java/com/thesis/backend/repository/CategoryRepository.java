package com.thesis.backend.repository;

import com.thesis.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.parentCategory IS NULL")
    public List<Category> findAllTopCategories();

    @Override
    Optional<Category> findById(Long id);
}
