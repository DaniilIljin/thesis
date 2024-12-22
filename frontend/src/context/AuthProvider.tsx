import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
    isAuthorized: boolean;
    loggedIn: (token: string) => void;
    loggedOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false
    );

    const loggedIn = (token: string) => {
        localStorage.setItem("jwtToken", token);
        setIsAuthorized(true);
    };

    const loggedOut = () => {
        localStorage.removeItem("jwtToken");
        setIsAuthorized(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthorized, loggedIn, loggedOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};