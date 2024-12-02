import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    useTheme,
} from "@mui/material";

const SignupFormPage = () => {
    const theme = useTheme(); // Access the theme for consistent colors

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login submitted!");
    };

    return <>
        <br/>
        <Paper
            elevation={6}
            sx={{
                padding: theme.spacing(4),
                textAlign: "center",
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >

                <Box component="form" onSubmit={handleSubmit} sx={{flexGrow: 1}} noValidate>
                    <Typography
                        component="h1"
                        variant="h5"
                    >
                        Signup
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="email"
                        label="username"
                        name="username"
                        autoFocus
                    />
                    <br/>
                    <TextField
                        margin="normal"
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <br/>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{marginTop: theme.spacing(3)}}
                    >
                        Sign up
                    </Button>

                </Box>
            </Box>
        </Paper>

    </>;
};

export default SignupFormPage;
