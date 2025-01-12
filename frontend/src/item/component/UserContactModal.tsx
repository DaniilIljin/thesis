import React from "react";
import {Dialog, DialogContent, DialogTitle, Box, Typography, IconButton} from "@mui/material";
import {UserDTO} from "../dto.ts";
import CloseIcon from '@mui/icons-material/Close';

type UserContactModalProps = {
    user: UserDTO;
    open: boolean;
    onClose: () => void;
};

const UserContactModal = ({ user, open, onClose }: UserContactModalProps) => {
    console.log(user)
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{
            '& .MuiDialog-paper': {
                maxHeight: '80%', // Set max height to prevent bottom scroll
            }
        }}>
            <DialogTitle sx={{ textAlign: "center" }}>
                Müüja kontakt info
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, paddingBottom: 2 }}>
                <Typography variant="h6">Nimi: {user.fullName}</Typography>
                <Typography variant="body1">Telefoninumber: {user.phone}</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>
            </DialogContent>
            <Box sx={{ display: "flex", justifyContent: "center", paddingBottom: 2 }}>
                <IconButton onClick={onClose} color="primary">
                    <CloseIcon/>
                </IconButton>
            </Box>
        </Dialog>
    );
};

export default UserContactModal;
