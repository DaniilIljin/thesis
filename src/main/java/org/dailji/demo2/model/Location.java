package org.dailji.demo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private  String description;

    @OneToMany
    @JsonIgnore
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private List<Category> categories = new ArrayList<>();
}
