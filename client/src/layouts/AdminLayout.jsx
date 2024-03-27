import {Outlet, useNavigate} from "react-router-dom";
import SideBar from "../components/admincomponents/SideBar";
import secureLocalStorage from "react-secure-storage";
import React, {useEffect} from "react";
import TopBar from "../components/admincomponents/TopBar";
import {CustomSpinner} from "../components/CustomSpinner";
import {useStoreContext} from "../contexts/StoreContext";
import {useQuery} from "react-query";
import {ClientApi} from "../api/ClientApi";
import {useAdminContext} from "../contexts/AdminContext";
import {AdminApi} from "../api/AdminApi";

function AdminLayout() {
    const userType = secureLocalStorage.getItem('userType')
    const token = secureLocalStorage.getItem('token')
    const {paginationData,setPaginationData,setCategories,setFourniseurs,setPharmacy} = useAdminContext()
    const navigate = useNavigate()
    const {setProducts,isLoading} = useStoreContext()
    useEffect(() => {
        if (!token || userType !== 'admin'){
            navigate("/admin/login")
        }
    }, [token,userType]);
    const page = paginationData?.page
    const {data:x,isLoading:loader1} = useQuery(['products',page],() => ClientApi.getProduts(page),{
        onSuccess: (({data}=[]) => {
            try {
                setProducts(data.data.data)
                setPaginationData({totalPages:Math.ceil(data.data.total / 9),page:data.data.current_page})
            }catch (e){
                console.log(e)
            }
        }),
        onError: (e => console.log(e))
    })
    const {data:y,isLoading:loader2} = useQuery('categories',ClientApi.getCategories,{
        onSuccess: (({data}=[]) => {
            try {
                setCategories(data.categories)
            }catch (e){
                console.log(e)
            }
        }),
        onError: (e => console.log(e))
    })
    const {data:z,isLoading:loader3} = useQuery('fourniseurs',AdminApi.getFourniseurs,{
        onSuccess: (({data}=[]) => {
            try {
                setFourniseurs(data.data)
            }catch (e){
                console.log(e)
            }
        }),
        onError: (e => console.log(e))
    })
    const {data:v,isLoading:loader4} = useQuery('pharmacy',AdminApi.getPharmacy,{
        onSuccess:(data => {
            try {
                setPharmacy(data.data.data)
            }catch (e) {console.log(e)}
        })
    })
    return (
        <>
            <div className="flex bg-gray-200">
                <div className="fixed left-0 top-0 h-screen w-[17rem] bg-green-400">
                    <SideBar />
                </div>
                <div className="flex-1 ml-[19rem] mr-8 ">
                    <div className="mt-8 ">
                        <TopBar />
                    </div>
                    <div className="mt-8">
                        <Outlet />
                    </div>
                    {isLoading || loader1 || loader2 || loader3 || loader4 ? <CustomSpinner /> : ''}
                </div>
            </div>
        </>



    );
}

export default AdminLayout;