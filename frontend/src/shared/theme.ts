import { createTheme } from '@mui/material/styles';

// Define the dark theme (theme1)
export const theme1 = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#bbbbbb',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

// Define the light theme (theme2)
export const theme2 = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
            secondary: '#4f4f4f',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});
