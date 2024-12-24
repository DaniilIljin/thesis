package com.thesis.backend.repository;

import com.thesis.backend.model.Item;
import com.thesis.backend.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ItemRepository extends JpaRepository<Item, Long> {
    public Item getItemById(Long id);
    public List<Item> findAllBySellerId(Long userId);
    public List<Item> findByBrandId(Long brandId, Sort sort);
    @Query("""
        SELECT i
        FROM Item i
        WHERE i.category.id = :categoryId
           OR i.category.id IN (
               SELECT c.id
               FROM Category c
               WHERE c.parentCategory.id = :categoryId
                  OR c.parentCategory.id IN (
                      SELECT cc.id FROM Category cc WHERE cc.parentCategory.id = :categoryId
                  )
           )
    """)
    public List<Item> findByCategoryId(Long categoryId, Sort sort);
    @Query("""
    SELECT i 
    FROM Item i 
    WHERE LOWER(i.name) LIKE LOWER(CONCAT('%', :searchQuery, '%')) 
       OR LOWER(i.brand.name) LIKE LOWER(CONCAT('%', :searchQuery, '%'))
       OR LOWER(i.category.name) LIKE LOWER(CONCAT('%', :searchQuery, '%'))
       OR LOWER(i.size.name) LIKE LOWER(CONCAT('%', :searchQuery, '%'))
""")
    public List<Item> findByNameOrBrandNameOrCategoryNameOrSizeName(String searchQuery, Sort sort);
    @Query("SELECT i.seller FROM Item i WHERE i.id = :id")
    public User findItemUser(Long id);
}
