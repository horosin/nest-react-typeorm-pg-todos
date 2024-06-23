import Layout from "./app/layout";

import MainPage from "./app/page";
import AboutPage from "./app/about/page";

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
];
