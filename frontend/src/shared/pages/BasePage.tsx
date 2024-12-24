import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import Background from "../components/Background.tsx";
import Header from "../components/Header.tsx";
import React, { useState } from "react";
import { theme1, theme2 } from "../theme.ts";

type BasePageProps = {
    children?: React.ReactNode;
};

const BasePage: React.FC<BasePageProps> = ({ children }) => {
    const [themeMode, setThemeMode] = useState(false);


    const toggleThemeMode = () => {
        console.log(`Current mode: ${themeMode ? "dark" : "light"}`); // Debugging: Check current mode
        setThemeMode(prevMode => {
          const newMode = !prevMode;
          return newMode;
      });
    };

    return (
        <>
            <ThemeProvider theme={themeMode ? theme1 : theme2}>
                <CssBaseline />
                <Background>
                <Container>
                    <Header themeMode={themeMode} toggleThemeMode={toggleThemeMode}/>
                    {children}
                </Container>
                </Background>
            </ThemeProvider>
        </>
    );
};

export default BasePage;
