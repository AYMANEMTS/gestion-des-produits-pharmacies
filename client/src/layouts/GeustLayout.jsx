import { Outlet, useLocation} from "react-router-dom";
import { NavbarWithMegaMenu} from "../components/geustComponents/parts/NavBar";
import Header from "../components/geustComponents/parts/Header";
import Footer from "../components/geustComponents/parts/Footer";
import {useQuery} from "react-query";
import {ClientApi} from "../api/ClientApi";
import {useStoreContext} from "../contexts/StoreContext";
import {DefaultSpeedDial} from "../components/geustComponents/SpeedDial";
import React, {useEffect, useState} from "react";
import FavoriteDrawer from "../components/geustComponents/FavoriteDrawer";
import {Pagination} from "../components/geustComponents/parts/Pagination";
import {CustomSpinner} from "../components/CustomSpinner";


function GeustLayout() {
    const {setProducts,isLoading} = useStoreContext()
    const {data: pdu,isFetching} = useQuery(['products'], () =>  ClientApi.getProduts(),{
        refetchOnWindowFocus:false,
        retry:1,
        cacheTime:100000,
        staleTime:100000,
        onSuccess:(({data}=[]) => {
            setProducts(data?.data)
        }),
        onError: (e => console.log(e))

    })
    const [open, setOpen] = useState(false);

    const openDrawer = () => {
        window.scrollTo({top:0})
        setOpen(true)
    };
    const closeDrawer = () => setOpen(false);
    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [open]);
    return (
        <div className={"bg-gray-100"}>
            <Header />
            <NavbarWithMegaMenu openDrawer={openDrawer}/>
            <div className={"container mx-auto mt-8"}>
                <Outlet />
                <DefaultSpeedDial openDrawer={openDrawer}/>
                <FavoriteDrawer open={open} openDrawer={openDrawer} closeDrawer={closeDrawer}/>

                {isLoading || isFetching ? <CustomSpinner /> : ""}
            </div>
            <Footer />
        </div>
    );
}

export default GeustLayout;