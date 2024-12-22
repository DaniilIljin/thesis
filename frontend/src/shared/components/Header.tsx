import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Switch,
    Link,
    IconButton,
    Drawer,
    Tooltip,
    ButtonGroup,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider.tsx";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {
    themeMode: boolean;
    toggleThemeMode: () => void;
};

const Header = ({ themeMode, toggleThemeMode }: Props) => {
    const { isAuthorized, loggedOut } = useAuth();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = () => {
        loggedOut();
        navigate("/");
    };

    const toggleDrawer = (open: boolean) => setDrawerOpen(open);

    const authLinks = (
        <ButtonGroup>
            <Tooltip title="Logout" arrow>
                <IconButton onClick={handleLogout} color="inherit">
                    <LogoutIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Profile" arrow>
                <IconButton onClick={() => navigate("/profile")} color="inherit">
                    <AccountCircleIcon />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );

    const guestLinks = (
        <ButtonGroup>
            <Tooltip title="Sign Up" arrow>
                <IconButton component={RouterLink} to="/signup" color="inherit">
                    <AppRegistrationIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Login" arrow>
                <IconButton component={RouterLink} to="/login" color="inherit">
                    <LoginIcon />
                </IconButton>
            </Tooltip>
        </ButtonGroup>
    );

    return (
        <>
            <AppBar sx={{ borderRadius: 2 }} position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Cooper Black, sans-serif', fontSize: 'large' }}>
                        <Tooltip title="Home page">
                            <Link component={RouterLink} color="inherit" underline="none" to={"/"}>
                                selling platform
                            </Link>
                        </Tooltip>
                    </Typography>

                    {isAuthorized && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Tooltip title="My favorites">
                                <Link component={RouterLink} to="/myFavorites" color="inherit">
                                    <IconButton color="inherit">
                                        <FavoriteIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>

                            <Tooltip title="My items">
                                <Link component={RouterLink} to="/myItems" color="inherit">
                                    <IconButton color="inherit">
                                        <FolderIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>

                            <Tooltip title="Add new item">
                                <Link component={RouterLink} to="/addItem" color="inherit">
                                    <IconButton color="inherit">
                                        <AddIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ display: { xs: "block", sm: "none" } }}
                            onClick={() => toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center", flexGrow: 1 }}>
                            {isAuthorized ? authLinks : guestLinks}
                        </Box>

                        <Switch checked={themeMode} onChange={toggleThemeMode} color="primary" />
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="top" open={drawerOpen} onClose={() => toggleDrawer(false)}>
                <Box sx={{ padding: 2 }}>
                    {isAuthorized ? authLinks : guestLinks}
                </Box>
                <Switch checked={themeMode} onChange={toggleThemeMode} color="primary" />
            </Drawer>
        </>
    );
};

export default Header;
