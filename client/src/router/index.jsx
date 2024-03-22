import {createBrowserRouter} from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import GeustLayout from "../layouts/GeustLayout.jsx";
import ClientLayout from "../layouts/ClientLayout.jsx";
import PharmacienLayout from "../layouts/PharmacienLayout.jsx";
import GHome from "../pages/gesutPages/GHome.jsx";
import GStore from "../pages/gesutPages/GStore";
import GSingleProduct from "../pages/gesutPages/GSingleProduct";
import Signup from "../components/geustComponents/Auth/Signup";
import Login from "../components/geustComponents/Auth/Login";
import Profile from "../pages/clientPages/Profile";
import CartItems from "../pages/clientPages/CartItems";

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
            },
            {
                element: <GSingleProduct />,
                path: "/store/:id"
            },
            {
                element: <Signup />,
                path: "/signup"
            },
            {
                element: <Login />,
                path: "/login"
            },
            {
                element: <CartItems />,
                path: "/cart/items"
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
                element: <Profile />,
                path: "/client/profile"
            }
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