package com.thesis.backend.repository;

import com.thesis.backend.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@Repository

public interface SizeRepository extends JpaRepository<Size, Long> {
}
