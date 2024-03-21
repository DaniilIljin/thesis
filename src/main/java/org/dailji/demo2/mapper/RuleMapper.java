package org.dailji.demo2.mapper;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.dto.RuleDTO;
import org.dailji.demo2.model.Rule;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RuleMapper {
    private final ModelMapper mapper;
    public RuleDTO convertRuleToRuleDTO(Rule object){
        return mapper.map(object, RuleDTO.class);
    }
    public Rule convertRuleDTOToRule(RuleDTO object){
        return mapper.map(object, Rule.class);
    }
}
