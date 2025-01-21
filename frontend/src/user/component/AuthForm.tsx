import { Box, Button, TextField, Typography, Paper, useTheme } from "@mui/material";
import { useState } from "react";
import { register, login } from "../../api/auth.ts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { useQueryClient} from "@tanstack/react-query";

const AuthForm = ({ isRegister }: { isRegister: boolean }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { loggedIn } = useAuth();
    const queryClient = useQueryClient()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const action = isRegister ? register : login;
            const response = await action(formData);
            loggedIn(response.token);
            console.log(isRegister ? 'Registration success:' : 'Login success:', response);
            queryClient.invalidateQueries(['favoriteItemIds']);
            navigate('/');
        } catch (error) {
            alert(isRegister ? 'Registration failed' : 'Login failed');
        }
    };

    return (
        <>
            <br />
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
                    <Box component="form" onSubmit={handleSubmit} sx={{ flexGrow: 1 }} noValidate>
                        <Typography component="h1" variant="h5">
                            {isRegister ? 'Konto registreerimine' : 'Sisse logimine'}
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            id="username"
                            label="Kasutajanimi"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            autoFocus
                        />
                        <br />
                        <TextField
                            margin="normal"
                            required
                            name="password"
                            label="Parool"
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        <br />
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            sx={{ marginTop: theme.spacing(3) }}
                        >
                            {isRegister ? 'Registreeri' : 'Logi sisse'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </>
    );
};

export default AuthForm;
