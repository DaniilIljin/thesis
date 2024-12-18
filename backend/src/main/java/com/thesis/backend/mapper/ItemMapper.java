package com.thesis.backend.mapper;

import com.thesis.backend.dto.item.ItemAddDTO;
import com.thesis.backend.dto.item.ItemViewDTO;
import com.thesis.backend.dto.PictureDTO;
import com.thesis.backend.model.Item;
import com.thesis.backend.model.Picture;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ItemMapper {

    private final ModelMapper modelMapper = new ModelMapper();

    public ItemViewDTO toItemViewDTO(Item item) {
        ItemViewDTO itemFullDTO = modelMapper.map(item, ItemViewDTO.class);

        itemFullDTO.setSellerName(item.getSeller().getUsername());

        if (item.getPictures() != null){
            List<PictureDTO> pictureDTOs = item.getPictures().stream()
                    .map(picture -> modelMapper.map(picture, PictureDTO.class)).toList();
            itemFullDTO.setPictures(pictureDTOs);
        }
        return itemFullDTO;
    }

    public Item toItem(ItemAddDTO itemAddDTO) {
        Item item = modelMapper.map(itemAddDTO, Item.class);
        List<Picture> pictures = itemAddDTO.getPictures().stream()
                .map(picture -> modelMapper.map(picture, Picture.class)).toList();
        item.setPictures(pictures);
        return modelMapper.map(itemAddDTO, Item.class);
    }
}