import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Switch,
    Link,
    IconButton,
    Drawer, Tooltip,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider.tsx";
import MenuIcon from "@mui/icons-material/Menu";

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
        <>
            <Typography >
                <Link p={2} to="#" color="inherit" underline="none" component={RouterLink} onClick={handleLogout}>
                    logout
                </Link>
                <Link p={2} color="inherit" underline="none" component={RouterLink} to='#'>
                    profile
                </Link>
            </Typography>
        </>
    );

    const guestLinks = (
        <>
            <Typography >
                <Link p={2} color="inherit" underline="none" component={RouterLink} to="/signup">
                    signup
                </Link>
                <Link p={2} color="inherit" underline="none" component={RouterLink} to="/login">
                    login
                </Link>
            </Typography>
        </>
    );

    return (
        <>
            <AppBar sx={{ borderRadius: 2 }} position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Tooltip title="Home page">
                        <Link component={RouterLink} color="inherit" underline="none" to={"/"}>
                            Selling Platform
                        </Link>
                        </Tooltip>
                    </Typography>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { xs: "block", sm: "none" } }}
                        onClick={() => toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                        {isAuthorized ? authLinks : guestLinks}
                    </Box>

                    <Switch
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        checked={themeMode}
                        onChange={toggleThemeMode}
                        color="primary"
                    />
                </Toolbar>
            </AppBar>

            {/* Drawer for mobile */}
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
