import { Box } from "@mui/material";
import { ReactNode } from "react";

type BackgroundProps = {
    children: ReactNode;
};

function Background({ children }: BackgroundProps) {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100wh",
                minHeight: "100vh",
                backgroundColor: "background.default",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {children}
        </Box>
    );
}

export default Background;
