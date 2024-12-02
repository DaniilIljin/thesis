import { Outlet } from "react-router-dom";
import BasePage from "./pages/BasePage.tsx";

const Root = () => {
    return (
        <BasePage>
            <Outlet />
        </BasePage>
    );
};

export default Root;
