import React from "react";
import { Box, Typography } from "@mui/material";

const NoDataBox = () => {
    return <>
        <br/>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
            }}
        >
            <Typography variant="h4" color='text' gutterBottom>
                Kuulutused pole leitud
            </Typography>
        </Box>
    </>
};

export default NoDataBox;
