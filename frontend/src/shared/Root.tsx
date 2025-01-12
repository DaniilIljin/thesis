import {Outlet} from "react-router-dom";
import BasePage from "./pages/BasePage.tsx";
import {AuthProvider} from "../context/AuthContext.tsx";

const Root = () => {
    return (
        <AuthProvider>
                <BasePage>
                    <Outlet/>
                </BasePage>
        </AuthProvider>
    );
};

export default Root;
