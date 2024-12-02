import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Switch,
    Link,
} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {useEffect, useState} from "react";

type Props = {
    themeMode: boolean,
    toggleThemeMode: () => void
}

const Header = (props: Props) => {

    // const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        setIsAuthenticated(!!token)
    }, []);

    // const handleLogout = () => {
    //     localStorage.removeItem("jwtToken"); // Remove token
    //     setIsAuthenticated(false); // Update state
    //     navigate("/login"); // Redirect to login page
    // };

    const authLinks = (
        <>
            <Typography>
                <Link
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                    to={"/signup"}
                >
                    log out
                </Link>
                <span> | </span>
                <Link
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                    to={"/login"}
                >
                    profile
                </Link>
            </Typography>
        </>
    );

    const guestLinks = (
        <>
            <Typography>
                <Link
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                    to={"/login"}
                >
                    log out
                </Link>
                <span> | </span>
                <Link
                    component={RouterLink}
                    color="inherit"
                    underline="none"
                    to={"/login"}
                >
                    profile
                </Link>
            </Typography>
        </>
    );


    return (
        <AppBar elevation={5}
            position="static"
            sx={{
                borderRadius: 1,
                overflow: "hidden",
            }}
        >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link
                        component={RouterLink}
                        color="inherit"
                        underline="none"
                        to={"/"}
                    >
                        selling platform
                    </Link>
                </Typography>
                {isAuthenticated ? guestLinks : authLinks}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Switch
                        checked={props.themeMode}
                        onChange={props.toggleThemeMode}
                        color="primary"
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
