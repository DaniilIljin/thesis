package org.dailji.demo2.repository;

import org.dailji.demo2.model.Location;
import org.springframework.data.repository.ListCrudRepository;

public interface LocationRepository extends ListCrudRepository<Location, Long> {
}
