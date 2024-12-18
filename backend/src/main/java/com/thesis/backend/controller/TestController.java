package com.thesis.backend.controller;

import com.thesis.backend.model.Brand;
import com.thesis.backend.model.Item;
import com.thesis.backend.model.User;
import com.thesis.backend.service.UnitOfWork;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private UnitOfWork unitOfWork;

    @PostMapping("/save-brand")
    public Brand saveBrand(@RequestBody Brand brand) {
        return unitOfWork.getBrandRepository().save(brand);
    }

    @PostMapping("/save-item")
    public Item saveItem(@RequestBody Item item) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = unitOfWork.getUserRepository().findByUsername(username).orElseThrow(RuntimeException::new);

        item.setSeller(user);

        return unitOfWork.getItemRepository().save(item);
    }
}