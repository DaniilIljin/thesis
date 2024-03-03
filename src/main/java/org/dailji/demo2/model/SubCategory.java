package org.dailji.demo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "sub_category")
public class SubCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @ManyToOne
    @JsonIgnore
    private Category category;

    @OneToMany
    @JoinColumn(name = "sub_category_id", referencedColumnName = "id")
    private List<Item> items = new ArrayList<>();
}
