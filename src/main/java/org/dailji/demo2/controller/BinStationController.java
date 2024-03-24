package org.dailji.demo2.controller;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.model.BinStation;
import org.dailji.demo2.repository.BinStationRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/binstation")
public class BinStationController {

    private final BinStationRepository repository;

    @GetMapping("/")
    public List<BinStation> getAll() {
        return repository.findAll();
    }

}
