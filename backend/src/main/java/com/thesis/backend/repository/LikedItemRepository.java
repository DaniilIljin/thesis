package com.thesis.backend.repository;

import com.thesis.backend.model.Item;
import com.thesis.backend.model.LikedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface LikedItemRepository extends JpaRepository<LikedItem, Long> {

    public LikedItem findByItemIdAndBuyerId(Long itemId, Long buyerId);

    @Query("SELECT li.item FROM LikedItem li WHERE li.buyer.id = :userId")
    List<Item> findLikedItemsByUserId(@Param("userId") Long userId);
}
