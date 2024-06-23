import Layout from "./app/layout";
import MainPage from "./app/page";
import AboutPage from "./app/about/page";

import AuthLayout from "./app/auth/layout";
import LoginPage from "./app/auth/login/page";
import RegisterPage from "./app/auth/register/page";
import path from "path";

export const routes = [ 
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: "about",
                element: <AboutPage />,
            }
        ],
    },
    {
        element: <AuthLayout />,
        children: [
            // {
            //     index: true,
            //     element: undefined,
            // },
            {
                path: "auth/login",
                element: <LoginPage />,
            },
            {
                path: "auth/register",
                element: <RegisterPage />,
            },
        ],
    },
];
