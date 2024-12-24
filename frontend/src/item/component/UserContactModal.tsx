import React from "react";
import { Dialog, DialogContent, DialogTitle, Button, Box, Typography } from "@mui/material";
import {UserDTO} from "../dto.ts";

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
                User Contact Information
            </DialogTitle>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, paddingBottom: 2 }}>
                <Typography variant="h6">Full Name: {user.fullName}</Typography>
                <Typography variant="body1">Phone Number: {user.phone}</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>
            </DialogContent>
            <Box sx={{ display: "flex", justifyContent: "center", paddingBottom: 2 }}>
                <Button onClick={onClose} variant="contained" color="primary">
                    Close
                </Button>
            </Box>
        </Dialog>
    );
};

export default UserContactModal;
