import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ViewItemPage from "./item/pages/ViewItemPage.tsx";
import ErrorPage from "./shared/pages/ErrorPage.tsx";
import Root from "./shared/Root.tsx";
import ShopPage from "./shop/ShopPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import LoginPage from "./user/pages/LoginPage.tsx";
import SignupPage from "./user/pages/SignupPage.tsx";
import AddItem from "./item/pages/AddItemPage.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import UserItemsPage from "./userItems/pages/UserItemsPage.tsx";
import UserFavoritesPage from "./userItems/pages/UserLikedItems.tsx";
import EditItem from "./item/pages/EditItemPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    path: "/",
                    element: <ShopPage/>,
                },
                {
                    path: "/login",
                    element: <LoginPage/>,
                },
                {
                    path: "/signup",
                    element: <SignupPage/>,
                },
                {
                    path: "viewItem/:id",
                    element: <ViewItemPage/>,
                },
                {
                    path: "addItem",
                    element: <AddItem/>,
                },
                {
                    path: "editItem/:id",
                    element: <EditItem/>,
                },
                {
                    path: "myItems",
                    element: <UserItemsPage/>,
                },
                {
                    path: "myFavorites",
                    element: <UserFavoritesPage/>,
                },

            ],
        },
    ],
    {
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    });

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);
