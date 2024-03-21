package org.dailji.demo2.repository;

import org.dailji.demo2.model.Item;
import org.springframework.data.repository.ListCrudRepository;

public interface ItemRepository extends ListCrudRepository<Item, Long> {
}
