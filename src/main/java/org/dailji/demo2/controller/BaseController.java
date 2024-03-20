package org.dailji.demo2.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
public class BaseController<T, R extends ListCrudRepository<T, Long>> {

    private final R repository;
    @GetMapping("/")
    public List<T> getAll(){
        return repository.findAll();
    }
    @PostMapping("/save")
    public T save(@RequestBody T thing){
        return repository.save(thing);
    }
    @PutMapping("/update")
    public T update(@RequestBody T thing){
        return repository.save(thing);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        repository.deleteById(id);
    }
}
