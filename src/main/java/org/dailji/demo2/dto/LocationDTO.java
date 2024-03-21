package org.dailji.demo2.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class LocationDTO{
    private Long id;
    private String name;
    private String address;
    private String description;
    private Long ruleId;
    private String ruleName;
    private String ruleDescription;
}

