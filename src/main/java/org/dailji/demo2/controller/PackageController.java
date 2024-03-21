package org.dailji.demo2.controller;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.model.Material;
import org.dailji.demo2.model.Package;
import org.dailji.demo2.repository.PackageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/package")
public class PackageController {

    private final PackageRepository repository;

    @GetMapping("/{id}")
    public ResponseEntity<Material> getById(@PathVariable Long id) {
        Optional<Package> packageOptional = repository.findById(id);

        /*
        TODO - Link trash to user for history purposes
        TODO - Add logic to differentiate between cardboard and paper
        */

        if (packageOptional.isPresent()) {
            Package trash = packageOptional.get();
            return ResponseEntity.ok(trash.getMaterial());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
