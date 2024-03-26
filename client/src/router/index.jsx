import {createBrowserRouter} from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import GeustLayout from "../layouts/GeustLayout.jsx";
import ClientLayout from "../layouts/ClientLayout.jsx";
import PharmacienLayout from "../layouts/PharmacienLayout.jsx";
import GHome from "../pages/gesutPages/GHome.jsx";
import GStore from "../pages/gesutPages/GStore";
import GSingleProduct from "../pages/gesutPages/GSingleProduct";
import Signup from "../pages/Auth/client/Signup";
import Login from "../pages/Auth/client/Login";
import Profile from "../pages/clientPages/Profile";
import ShopingCart from "../pages/gesutPages/ShopingCart";
import Checkout from "../pages/clientPages/Checkout";
import Orders from "../pages/clientPages/Orders";
import OrderDetail from "../pages/clientPages/OrderDetail";
import Contact from "../pages/gesutPages/Contact";
import AdminLogin from "../pages/Auth/admin/AdminLogin";
import AHome from "../pages/adminPages/AHome";
import Products from "../pages/adminPages/Products";
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
            },
            {
                element: <Contact />,
                path: "/contact"
            },


        ]
    },
    {
        element: <AdminLayout />,
        children: [
            {
                element: <AHome />,
                path: "/admin/home"
            },
            {
                element: <Products />,
                path: "/admin/products"
            }
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
    },

    {
        element: <AdminLogin />,
        path: "/admin/login"
    }
])