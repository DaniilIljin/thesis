import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Box, Divider, Typography} from "@mui/material";
import {useState} from "react";
import {useFilterContext} from "../../context/FilterContext.tsx";

const CategoryAccordion = ({category}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {setCategoryId} = useFilterContext();

    const toggleOpen = () => {
        if (category.subCategories && category.subCategories.length > 0) {
            setIsOpen(!isOpen);
        }
    };


    return (
        <Box my={1}>
            <Box
                sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                }}
            >
                <Typography
                    onClick={() => setCategoryId(category.id)}
                >{category.name}</Typography>
                {category.subCategories &&
                    category.subCategories.length > 0 &&
                    (isOpen ? (
                        <ExpandLessIcon onClick={toggleOpen}
                                        fontSize="small"/>

                    ) : (
                        <ExpandMoreIcon onClick={toggleOpen}
                                        fontSize="small"/>
                    ))}
            </Box>
            {isOpen &&
                category.subCategories &&
                category.subCategories.length > 0 && (
                    <>
                        <Divider/>
                        <Box fontSize={14} pl={1}>
                            {category.subCategories.map((sub, index) => (
                                <CategoryAccordion key={index} category={sub}/>
                            ))}
                        </Box>
                        <Divider/>
                    </>
                )}
        </Box>
    );
};
export default CategoryAccordion;
