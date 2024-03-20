package org.dailji.demo2.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "rule")
public class Rule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @OneToMany
    @JoinColumn(name = "rule_id", referencedColumnName = "id")
    @JsonIgnore
    private List<Location> locations;

    @OneToMany
    @JoinColumn(name = "rule_id", referencedColumnName = "id")
    private List<Category> categories;
}
