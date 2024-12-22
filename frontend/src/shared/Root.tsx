import {Outlet} from "react-router-dom";
import BasePage from "./pages/BasePage.tsx";
import {AuthProvider} from "../context/AuthProvider.tsx";
import {FavoriteIdsProvider} from "../context/FavoriteIdsContext.tsx";

const Root = () => {
    return (
        <AuthProvider>
            <FavoriteIdsProvider>
                <BasePage>
                    <Outlet/>
                </BasePage>
            </FavoriteIdsProvider>
        </AuthProvider>
    );
};

export default Root;
