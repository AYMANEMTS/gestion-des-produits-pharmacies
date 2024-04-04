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
import Orders from "../pages/clientPages/Orders";
import OrderDetail from "../pages/clientPages/OrderDetail";
import Contact from "../pages/gesutPages/Contact";
import AdminLogin from "../pages/Auth/admin/AdminLogin";
import AHome from "../pages/adminPages/AHome";
import Products from "../pages/adminPages/manage/Products";
import Users from "../pages/adminPages/manage/Users";
import Categories from "../pages/adminPages/manage/Categories";
import Fourniseurs from "../pages/adminPages/manage/Fourniseurs";
import Pharmacy from "../pages/adminPages/manage/Pharmacy";
import PharmaciensOrders from "../pages/adminPages/oreders/pharmaciens/PharmaciensOrders";
import ClientsOrders from "../pages/adminPages/oreders/clients/ClientsOrders";
import PStore from "../pages/pharmacienPages/PStore";
import PCheckout from "../pages/pharmacienPages/PCheckout";
import PharmacienLogin from "../pages/Auth/pharmacien/PharmacienLogin";
import PharmacienRegister from "../pages/Auth/pharmacien/PharmacienRegister";
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
            },
            {
                element: <Users />,
                path: "/admin/users"
            },
            {
                element: <Categories />,
                path: "/admin/category"
            },
            {
                element: <Fourniseurs />,
                path: "/admin/fourniseurs"
            },
            {
                element: <Pharmacy />,
                path: "/admin/pharmacy"
            },
            {
                element: <PharmaciensOrders />,
                path: "/admin/orders/pharmaciens"
            },
            {
                element: <ClientsOrders />,
                path: "/admin/orders/clients"
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
            {
                element: <PStore />,
                path: "/pharmacien/store"
            },
            {
                element: <PCheckout />,
                path: "/pharmacien/checkout"
            }
        ]
    },

    {
        element: <AdminLogin />,
        path: "/admin/login"
    },
    {
        element: <PharmacienLogin />,
        path: "/pharmacien/login"
    },
    {
        element: <PharmacienRegister />,
        path: "/pharmacien/register"
    }
])