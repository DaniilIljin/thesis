package org.dailji.demo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @ManyToOne
    @JsonIgnore
    private Rule rule;

    @OneToMany
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private List<SubCategory> subCategories;
}
