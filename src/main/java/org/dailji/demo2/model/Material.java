package org.dailji.demo2.model;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public enum Material {
    PLASTIC(1),
    PAPER_FIBREBOARD_CARTON(2),
    METAL(3),
    WOOD(4),
    TEXTILE(5),
    GLASS(6),
    COMPOSITE(7);

    private final int code;

    Material(int code) {
        this.code = code;
    }

    private static final Map<Integer, Material> codeToMaterialMap;

    static {
        codeToMaterialMap = new HashMap<>();
        for (Material material : Material.values()) {
            codeToMaterialMap.put(material.getCode(), material);
        }
    }

    public int getCode() {
        return code;
    }

    public static Material getByCode(Integer code) {
        if (code == null) {
            return null;
        }
        return codeToMaterialMap.get(code);
    }

}