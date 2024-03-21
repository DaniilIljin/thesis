package org.dailji.demo2.mapper;

import lombok.RequiredArgsConstructor;
import org.dailji.demo2.dto.LocationDTO;
import org.dailji.demo2.model.Location;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LocationMapper {
    private final ModelMapper mapper;
    public LocationDTO convertLocationToLocationDTO(Location object){
        return mapper.map(object, LocationDTO.class);
    }
    public Location convertLocationDTOToLocation(LocationDTO object){
        return mapper.map(object, Location.class);
    }
}
