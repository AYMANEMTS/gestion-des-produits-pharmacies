import {Outlet, useNavigate} from "react-router-dom";
import Header from "../components/geustComponents/parts/Header";
import {NavbarWithMegaMenu} from "../components/geustComponents/parts/NavBar";
import Footer from "../components/geustComponents/parts/Footer";
import React, {useEffect, useState} from "react";
import {DefaultSpeedDial} from "../components/geustComponents/SpeedDial";
import FavoriteDrawer from "../components/geustComponents/FavoriteDrawer";
import {CustomSpinner} from "../components/CustomSpinner";
import {useStoreContext} from "../contexts/StoreContext";
import secureLocalStorage from "react-secure-storage";

function ClientLayout() {
    const token = secureLocalStorage.getItem('token')
    const userType = secureLocalStorage.getItem('userType')
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const {isLoading } = useStoreContext()
    const openDrawer = () => {
        window.scrollTo({top:0})
        setOpen(true)
    };
    const closeDrawer = () => setOpen(false);
    useEffect(() => {
        if (!token || userType !== 'client'){
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
                {isLoading  ? <CustomSpinner /> : ""}
            </div>
            <Footer />
        </div>
    );
}

export default ClientLayout;