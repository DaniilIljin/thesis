import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewItemPage from "./item/pages/ViewItemPage.tsx";
import ErrorPage from "./shared/pages/ErrorPage.tsx";
import Root from "./shared/Root.tsx";
import ShopPage from "./shop/ShopPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginFormPage from "./user/pages/LoginFormPage.tsx";
import SignupFormPage from "./user/pages/SignupFormPage.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <ShopPage />,
            },
            {
                path: "/login",
                element: <LoginFormPage />,
            },
            {
                path: "/signup",
                element: <SignupFormPage />,
            },
            {
                path: "viewItem/:id",
                element: <ViewItemPage />,
            },
            // {
            //     path: "addItem",
            //     element: <AddItem />,
            // },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    </StrictMode>
);
