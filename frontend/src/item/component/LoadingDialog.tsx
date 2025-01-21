import React from "react";
import {Box, CircularProgress, Dialog, DialogContent, DialogTitle, Typography} from "@mui/material";

interface LoadingDialogProps {
    open: boolean;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({open}) => (
    <Dialog open={open}>
        <DialogTitle>Uploading Images</DialogTitle>
        <DialogContent>
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <CircularProgress />
            </Box>
            <Typography variant="body1" align="center" sx={{mt: 2}}>
                Please wait while the images are being uploaded...
            </Typography>
        </DialogContent>
    </Dialog>
);

export default LoadingDialog;
