package org.dailji.demo2.controller;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.dto.SmallRuleDTO;
import org.dailji.demo2.model.Rule;
import org.dailji.demo2.service.MainService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("api/rule")
public class RuleController {

    private final MainService service;
    @GetMapping("/")
    public List<SmallRuleDTO> getAll(){
        return service.getSmallExistingRules();
    }

    @GetMapping("/full")
    public List<Rule> getAllFull(){
        return service.getFullExistingRules();
    }

    @PostMapping("/saveFull")
    public Rule saveAllFull(@RequestBody Rule fullRule){
        return service.saveAll(fullRule);
    }
}
