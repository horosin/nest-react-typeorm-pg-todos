import ErrorPage from "./app/error-page";

import AppLayout from "./app/layout";
import MainPage from "./app/page";
import AboutPage from "./app/about/page";

import AuthLayout from "./app/auth/layout";
import LoginPage from "./app/auth/login/page";
import RegisterPage from "./app/auth/register/page";
import { AuthProvider } from "./auth/hooks/use-auth";
import { ProtectedRoute } from "./auth/protected-route";

export const routes = [
  {
    element: <AuthProvider />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: <MainPage />,
              },
              {
                path: "about",
                element: <AboutPage />,
              },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
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
    ],
  },
];
