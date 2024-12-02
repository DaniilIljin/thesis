import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import {CategoryDTO} from "../dto.ts";

type Props = {
    category: CategoryDTO;
};

const CategoryAccordion: React.FC<Props> = ({ category }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = () => {
        if (category.subcategories && category.subcategories.length > 0) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <Box my={1}>
            <Box
                onClick={toggleOpen}
                sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                }}
            >
                <Typography>{category.name}</Typography>
                {category.subcategories &&
                    category.subcategories.length > 0 &&
                    (isOpen ? (
                        <ExpandLessIcon fontSize="small" />
                    ) : (
                        <ExpandMoreIcon fontSize="small" />
                    ))}
            </Box>
            {isOpen &&
                category.subcategories &&
                category.subcategories.length > 0 && (
                    <>
                        <Divider />
                        <Box fontSize={14} pl={1}>
                            {category.subcategories.map((sub, index) => (
                                <CategoryAccordion key={index} category={sub} />
                            ))}
                        </Box>
                        <Divider />
                    </>
                )}
        </Box>
    );
};
export default CategoryAccordion;
