import { Box } from "@mui/material";

function Background() {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                backgroundColor: "background.default",
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: -1,
            }}
        />
    );
}

export default Background;
