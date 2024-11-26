package com.thesis.backend.repository;

import com.thesis.backend.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository
@RepositoryRestResource(path = "brands")
// Repository for Brand
public interface BrandRepository extends JpaRepository<Brand, Long> {
}
