package org.dailji.demo2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "package")
public class Package {
    @Id
    private Long ean;
    private String brand;
    private String name;
    private Double size;
    private String unit;
    private Material material;
    private Boolean isRecyclable;
    private MaterialClass materialClass;
    private Double packageWeight;
}
