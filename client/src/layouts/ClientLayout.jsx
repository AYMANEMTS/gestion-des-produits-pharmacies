import {Outlet, useNavigate} from "react-router-dom";
import Header from "../components/geustComponents/Header";
import {NavbarWithMegaMenu} from "../components/geustComponents/NavBar";
import Footer from "../components/geustComponents/Footer";
import React, {useEffect, useState} from "react";
import {DefaultSpeedDial} from "../components/geustComponents/SpeedDial";
import FavoriteDrawer from "../components/geustComponents/FavoriteDrawer";

function ClientLayout() {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const openDrawer = () => {
        window.scrollTo({top:0})
        setOpen(true)
    };
    const closeDrawer = () => setOpen(false);
    useEffect(() => {

        if (!token){
            navigate("/login")
        }
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [token,open]);

    return (
        <div className={"bg-gray-100"}>
            <Header />
            <NavbarWithMegaMenu openDrawer={openDrawer}/>
            <div className={"container mx-auto mt-8"}>
                <Outlet />
                <DefaultSpeedDial openDrawer={openDrawer}/>
                <FavoriteDrawer open={open} openDrawer={openDrawer} closeDrawer={closeDrawer}/>
            </div>
            <Footer />
        </div>
    );
}

export default ClientLayout;