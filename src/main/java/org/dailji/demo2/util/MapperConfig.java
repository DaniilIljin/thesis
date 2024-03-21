package org.dailji.demo2.util;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class MapperConfig {
    @Bean
    public ModelMapper getModelMapper(){
        return new ModelMapper();
    }
}
