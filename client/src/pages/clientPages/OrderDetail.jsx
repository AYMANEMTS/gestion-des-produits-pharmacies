import React, {useEffect, useState} from 'react';
import ClientNav from "../../components/clientComponents/ClientNav";
import {useNavigate, useParams} from "react-router-dom";
import {ClientApi} from "../../api/ClientApi";
import OrderCartItems from "../../components/clientComponents/Oreders/OrderCartItems";
import OrderSumray from "../../components/clientComponents/Oreders/OrderSumray";
import OrderCustomerInformation from "../../components/clientComponents/Oreders/OrderCustomerInformation";
import {DateFormat} from "../../helpers/DateFormat";

function OrderDetail() {
    const {id} = useParams()
    const [orderData, setOrderData] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        try {
            async function getorder(){
                await ClientApi.getOrder(id).then(({request,data}) => {
                    if (request.status !== 200){
                        navigate("/client/orders")
                    }
                    if (data.status){
                        setOrderData(data.data)
                    }
                }).catch(() => navigate("/store"))
            }
            getorder()
        }catch (e){
            navigate("/client/orders")
        }
    }, []);
    const shippingAddress = orderData.shippingAddress && JSON.parse(orderData.shippingAddress)
    const paymentInfo = orderData.shippingAddress && JSON.parse(orderData.paymentInfo)
    const userInformation = orderData.paymentInfo && JSON.parse(orderData.userInformation)
    const customerInfo = {shippingAddress,paymentInfo,userInformation}
    return (
        <>
            <ClientNav/>
            <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

                <div className="flex justify-start item-start space-y-2 flex-col">
                    <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order
                        #13432</h1>
                    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                        {DateFormat(orderData?.created_at)}
                    </p>
                </div>
                <div
                    className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s
                                Cart</p>
                            {orderData?.produits?.map((product,key) => (
                                <div key={key}><OrderCartItems product={product}/></div>
                            ))}

                        </div>
                        <OrderSumray orderData={orderData}/>
                    </div>
                    <OrderCustomerInformation customerInfo={customerInfo}/>
                </div>
            </div>
        </>
    );
}

export default OrderDetail;


