package org.dailji.demo2.controller;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.dto.LocationDTO;
import org.dailji.demo2.dto.RuleDTO;
import org.dailji.demo2.service.LocationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/location")
public class LocationController {

    private final LocationService service;
    @GetMapping("/")
    public List<LocationDTO> getAll(){
        return service.findAll();
    }

    @GetMapping("/rules")
    public List<RuleDTO> getExistingRules(){return service.getRulesExistingRules();
    }
    @GetMapping("/getById/{id}")
    public LocationDTO getById(@PathVariable Long id){return service.getById(id);
    }
    @PostMapping("/save")
    public LocationDTO save(@RequestBody LocationDTO location){return service.save(location);
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){service.delete(id);
    }
}
