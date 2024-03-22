package org.dailji.demo2.model;

import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public enum MaterialClass {
    PET(1),
    HDPE(2),
    PVC(3),
    LDPE(4),
    PP(5),
    PS(6),
    OTHER_PLASTIC(7),
    PAP_CORRUGATED_FIBREBOARD(20),
    PAP_NON_CORRUGATED_FIBREBOARD(21),
    PAP_PAPER(22),
    OTHER_PAPER_CARTON(23),
    FE_STEEL(40),
    ALU_ALUMINIUM(41),
    OTHER_METAL(42),
    FOR_WOOD(50),
    FOR_CORK(51),
    OTHER_WOOD(52),
    TEX_COTTON(60),
    TEX_JUTE(61),
    OTHER_TEXTILE(62),
    GL_COLOURLESS(70),
    GL_GREEN(71),
    GL_BROWN(72),
    OTHER_GLASS(73),
    PAPER_FIBREBOARD_MISC_METALS(80),
    PAPER_FIBREBOARD_PLASTIC(81),
    PAPER_FIBREBOARD_ALUMINIUM(82),
    PAPER_FIBREBOARD_TINPLATE(83),
    PAPER_FIBREBOARD_PLASTIC_ALUMINIUM(84),
    PAPER_FIBREBOARD_PLASTIC_ALUMINIUM_TINPLATE(85),
    PLASTIC_ALUMINIUM(90),
    PLASTIC_TINPLATE(91),
    PLASTIC_MISC_METALS(92),
    GLASS_PLASTIC(95),
    GLASS_ALUMINIUM(96),
    GLASS_TINPLATE(97),
    GLASS_MISC_METALS(98);

    private final int code;

    MaterialClass(int code) {
        this.code = code;
    }

    private static final Map<Integer, MaterialClass> codeToClassMap;

    static {
        codeToClassMap = new HashMap<>();
        for (MaterialClass materialClass : MaterialClass.values()) {
            codeToClassMap.put(materialClass.getCode(), materialClass);
        }
    }

    public int getCode() {
        return code;
    }

    public static MaterialClass getByCode(Integer code) {
        if (code == null) {
            return null;
        }
        return codeToClassMap.get(code);
    }

}
