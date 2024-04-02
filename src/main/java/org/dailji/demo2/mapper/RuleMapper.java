package org.dailji.demo2.mapper;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.dto.SmallRuleDTO;
import org.dailji.demo2.model.Rule;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RuleMapper {
    private final ModelMapper mapper;
    public SmallRuleDTO convertRuleToRuleDTO(Rule object){
        return mapper.map(object, SmallRuleDTO.class);
    }
    public Rule convertRuleDTOToRule(SmallRuleDTO object){
        return mapper.map(object, Rule.class);
    }
}
