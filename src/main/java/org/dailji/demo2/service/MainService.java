package org.dailji.demo2.service;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.dto.LocationDTO;
import org.dailji.demo2.dto.RuleDTO;
import org.dailji.demo2.mapper.LocationMapper;
import org.dailji.demo2.mapper.RuleMapper;
import org.dailji.demo2.model.Location;
import org.dailji.demo2.model.Rule;
import org.dailji.demo2.util.UOW;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {
    private final UOW uow;
    private final LocationMapper locationMapper;
    private final RuleMapper ruleMapper;

    public List<LocationDTO> findAll(){
        return uow.getLocationRepository().findAll().stream()
                .map(locationMapper::convertLocationToLocationDTO).toList();
    }

    public LocationDTO getById(Long id){
        Location location = uow.getLocationRepository().findById(id)
                .orElseThrow(() -> new RuntimeException("No location with such id: " + id));
        return locationMapper.convertLocationToLocationDTO(location);
    }

    public LocationDTO save(LocationDTO locationDTO){
        Rule newRule = null;

        if (locationDTO.getRuleId() != null)
            newRule = uow.getRuleRepository().findById(locationDTO.getRuleId())
                    .orElseThrow(() -> new RuntimeException("No rule with such id: " + locationDTO.getRuleId()));

        Location location = locationMapper.convertLocationDTOToLocation(locationDTO);
        location.setRule(newRule);
        uow.getLocationRepository().save(location);

        return locationMapper.convertLocationToLocationDTO(location);
    }

    public List<RuleDTO> getRulesExistingRules(){
        return uow.getRuleRepository().findAll().stream()
                .map(ruleMapper::convertRuleToRuleDTO).toList();
    }

    public void delete(Long id) {
        uow.getLocationRepository().deleteById(id);
    }
}
