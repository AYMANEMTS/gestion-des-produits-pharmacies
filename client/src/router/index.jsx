import {createBrowserRouter} from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import GeustLayout from "../layouts/GeustLayout.jsx";
import ClientLayout from "../layouts/ClientLayout.jsx";
import PharmacienLayout from "../layouts/PharmacienLayout.jsx";
import GHome from "../pages/gesutPages/GHome.jsx";
import GStore from "../pages/gesutPages/GStore";

export const router = createBrowserRouter([
    {
        element: <GeustLayout />,
        children: [
            {
                element: <GHome />,
                path: "/"
            },
            {
                element: <GStore />,
                path: "/store"
            }
        ]
    },
    {
        element: <AdminLayout />,
        children: [
            {
                element: "admin home",
                path: "/admin/home"
            },
        ]
    },
    {
        element: <ClientLayout />,
        children: [
            {
                element: "client home",
                path: "/client/home"
            },
        ]
    },
    {
        element: <PharmacienLayout />,
        children: [
            {
                element: "pharmacien home",
                path: "/pharmacien/home"
            },
        ]
    }
])