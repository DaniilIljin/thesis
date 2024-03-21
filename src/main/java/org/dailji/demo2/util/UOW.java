package org.dailji.demo2.util;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.dailji.demo2.repository.*;
import org.springframework.stereotype.Component;

@Data
@Component
@RequiredArgsConstructor
public class UOW {
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;
    private final RuleRepository ruleRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final LocationRepository locationRepository;
}
