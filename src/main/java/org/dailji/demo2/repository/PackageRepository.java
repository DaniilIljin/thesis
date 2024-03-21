package org.dailji.demo2.repository;

import org.dailji.demo2.model.Category;
import org.dailji.demo2.model.Package;
import org.springframework.data.repository.ListCrudRepository;

public interface PackageRepository extends ListCrudRepository<Package, Long> {
}
