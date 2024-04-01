package org.dailji.demo2.controller;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.dto.RuleDTO;
import org.dailji.demo2.service.MainService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("api/rule")
public class RuleController {

    private final MainService service;
    @GetMapping("/")
    public List<RuleDTO> getAll(){
        return service.getRulesExistingRules();
    }
}
