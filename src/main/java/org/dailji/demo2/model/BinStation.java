package org.dailji.demo2.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "binstation")
public class BinStation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double latitude;
    private Double longitude;
    private String title;
    private String address;
    private String email;
    private String phone;
    private String description;
    private List<Material> categories;
    private String openingTimes;
    private String imageUrl;
}
