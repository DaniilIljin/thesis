import { Box, Typography } from "@mui/material";
import {BrandDTO} from "../dto.ts";

type Props = {
    brand: BrandDTO;
};

const BrandAccordion: React.FC<Props> = ({ brand }) => {

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
                <Typography>{brand.name}</Typography>
            </Box>
        </Box>
    );
};
export default BrandAccordion;
