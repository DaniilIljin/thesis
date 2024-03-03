package org.dailji.demo2.controller;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.model.Category;
import org.dailji.demo2.repository.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/category")
public class CategoryController {

    private final CategoryRepository repository;

    @GetMapping("/")
    public List<Category> getAll(){
        return repository.findAll();
    }

    @PostMapping("/save")
    public Category save(@RequestBody Category category){
        return repository.save(category);
    }

    @PutMapping("/update")
    public Category update(@RequestBody Category category){
        return repository.save(category);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        repository.deleteById(id);
    }
}
