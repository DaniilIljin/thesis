package org.dailji.demo2.controller;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.model.Location;
import org.dailji.demo2.repository.LocationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/location")
public class LocationController {

    private final LocationRepository repository;
    @GetMapping("/")
    public List<Location> getAll(){
        return repository.findAll();
    }

    @PostMapping("/save")
    public Location save(@RequestBody Location category){
        return repository.save(category);
    }

    @PutMapping("/update")
    public Location update(@RequestBody Location category){
        return repository.save(category);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        repository.deleteById(id);
    }
}
