package org.dailji.demo2.repository;

import org.dailji.demo2.model.BinStation;
import org.dailji.demo2.model.Category;
import org.dailji.demo2.model.Package;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface BinStationRepository extends ListCrudRepository<BinStation, Long> {
}
