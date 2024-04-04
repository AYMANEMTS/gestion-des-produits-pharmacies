import {Outlet, useNavigate} from "react-router-dom";
import {PNavbar} from "../components/pharmacienComponenet/PNavbar";
import {useQuery} from "react-query";

import {ClientApi} from "../api/ClientApi";
import {useAdminContext} from "../contexts/AdminContext";
import {CustomSpinner} from "../components/CustomSpinner";
import React, {useEffect, useState} from "react";
import FavoriteDrawer from "../components/geustComponents/FavoriteDrawer";
import ShopingDrawer from "../components/pharmacienComponenet/ShopingDrawer";
import {useUserContext} from "../contexts/AuthContext";

function PharmacienLayout() {
    const navigate = useNavigate()
    const {token,userType} = useUserContext()
    const {setProducts} = useAdminContext()
    const {data:x,isLoading:loader1} = useQuery(['products'],() => ClientApi.getProduts(),{
        onSuccess: (({data}=[]) => {
            try {
                setProducts(data.data)
            }catch (e){
                console.log(e)
            }
        }),
        onError: (e => console.log(e))
    })
    const [openFavorite, setOpenFavorite] = useState(false)
    const [openShoping, setOpenShoping] = useState(false)
    const openDrawerShoping = () => {
        window.scrollTo({top:0})
        setOpenShoping(true)
    };
    const openDrawerFavorite = () => {
        window.scrollTo({top:0})
        setOpenFavorite(true)
    };
    const closeDrawerFavorite = () => setOpenFavorite(false);
    const closeDrawerShoping = () => setOpenShoping(false);
    useEffect(() => {
        if (!token && userType !== 'pharmacien'){
            navigate("/pharmacien/login")
        }
        if (openFavorite || openShoping) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [navigate, openFavorite, openShoping, token, userType]);
    return (
        <div className={"bg-gray-200 h-screen"}>
            <PNavbar openFavoriteDrawer={openDrawerFavorite} openShopingDrawer={openDrawerShoping} content={<Outlet />} />
            {loader1 && <CustomSpinner />}
            <FavoriteDrawer open={openFavorite}  closeDrawer={closeDrawerFavorite}/>
            <ShopingDrawer open={openShoping}  closeDrawer={closeDrawerShoping}/>
        </div>
    );
}

export default PharmacienLayout;