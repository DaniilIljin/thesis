package com.thesis.backend.service;

import com.thesis.backend.repository.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@RequiredArgsConstructor
public class UnitOfWork {
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final SizeRepository sizeRepository;
    private final UserRepository userRepository;
    private final LikedItemRepository likedItemRepository;
    private final PictureRepository pictureRepository;
}