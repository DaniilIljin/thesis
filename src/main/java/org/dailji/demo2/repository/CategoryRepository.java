package org.dailji.demo2.repository;

import org.dailji.demo2.model.Category;
import org.springframework.data.repository.ListCrudRepository;

public interface CategoryRepository extends ListCrudRepository<Category, Long> {
}
