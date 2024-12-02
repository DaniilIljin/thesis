import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    useTheme,
} from "@mui/material";
import {useState} from "react";
import {login} from "../api.ts";
import {useNavigate} from "react-router-dom";

const LoginFormPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

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

    const  handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            console.log('Login success:', response);
            navigate('/')
        } catch (error) {
            alert('Login failed');
        }

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
                        Log in
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        id="email"
                        label="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                    <br/>
                    <Button onClick={handleSubmit} variant="contained"
                        type="submit"
                        color="primary"
                        sx={{marginTop: theme.spacing(3)}}
                    >
                        Sign In
                    </Button>

                </Box>
            </Box>
        </Paper>

    </>;
};

export default LoginFormPage;
