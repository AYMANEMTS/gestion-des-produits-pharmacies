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
import ShopingCart from "../pages/gesutPages/ShopingCart";
import Checkout from "../pages/clientPages/Checkout";
import Orders from "../pages/clientPages/Orders";
import OrderDetail from "../pages/clientPages/OrderDetail";
const token = localStorage.getItem('token')
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
                element: <ShopingCart />,
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
            },
            {
                element: <Checkout />,
                path: "/client/checkout"
            },
            {
                element: <Orders />,
                path: "/client/orders"
            },
            {
                element: <OrderDetail />,
                path: "/client/order/:id"
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