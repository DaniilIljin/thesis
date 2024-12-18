package com.thesis.backend.repository;

import com.thesis.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ItemRepository extends JpaRepository<Item, Long> {
    public Item getItemById(Long id);
    public List<Item> findAllBySellerId(Long userId);
}
