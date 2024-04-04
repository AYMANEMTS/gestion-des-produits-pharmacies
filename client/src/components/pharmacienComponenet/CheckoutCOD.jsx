import React, {useState} from 'react';
import {Button, Input} from "@material-tailwind/react";
import {useAdminContext} from "../../contexts/AdminContext";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {axiosClient} from "../../api/axios";
import {useForm} from "react-hook-form";
import {PharmacienApi} from "../../api/PharmacienApi";
import {SetApiErrors} from "../../helpers/SetApiErrors";
import PaymentSuccess from "../clientComponents/CheckoutItems/PaymentSuccess";
function CheckoutCOD() {
    const { products } = useAdminContext();
    const { getTotalPrice, cartItems, clearShoppingCart } = useShopingCart();
    const [orderForm, setOrderForm] = useState(false)
    const {register,handleSubmit,formState:{errors},setError} = useForm()
    const [successOrder, setSuccessOrder] = useState(false)
    const handleOnlineCheckout = async () => {
        try {
            const res = await axiosClient.post("/api/init/payment",{productsData:cartItems,
                redirectPage:"http://localhost:3000/pharmacien/checkout"})
            if (res.data.status){
                window.location.href = res.data.url;
            }else console.log(res.data.message)
        }catch (e) {
            console.error(e)
        }
    };
    const handleCashCheckout = async (data) => {
        try {
            data.productsWithQty = cartItems
            const res = await PharmacienApi.storeOrder(data)
            if (!res.data.status){
                SetApiErrors(res.data.errors,setError)
            }else {
                clearShoppingCart()
                setSuccessOrder(true)
            }

        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 rounded">
                <p className="text-xl font-medium">Pay with card or Cash </p>
                <p className="text-gray-400">Complete your order by providing your information.</p>

                <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                        <p className="font-semibold text-gray-900">{getTotalPrice(products)} DH</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                        <p className="font-semibold text-gray-900">0.00 DH</p>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">{getTotalPrice(products)} DH</p>
                </div>
                <button onClick={() => setOrderForm(!orderForm)}
                        className="mt-4 mb-3 w-full rounded-md bg-gray-700 hover:bg-gray-800 px-6 py-2 font-medium text-white">
                    <div className={"flex justify-center"}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5"
                                 viewBox="0 0 576 512">
                                <path
                                    d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM128 416H64V352c35.3 0 64 28.7 64 64zM64 224V160h64c0 35.3-28.7 64-64 64zM448 352c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM384 256c0 61.9-43 112-96 112s-96-50.1-96-112s43-112 96-112s96 50.1 96 112zM252 208c0 9.7 6.9 17.7 16 19.6V276h-4c-11 0-20 9-20 20s9 20 20 20h24 24c11 0 20-9 20-20s-9-20-20-20h-4V208c0-11-9-20-20-20H272c-11 0-20 9-20 20z"/>
                            </svg>
                        </div>
                        <div className={"text-sm pl-2 "}>
                            Pay With Cash
                        </div>
                    </div>
                </button>
                <button onClick={handleOnlineCheckout}
                        className="mb-4 w-full rounded-md bg-green-500 hover:bg-green-800 px-6 py-2 font-medium text-white">
                    <div className={"flex justify-center"}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 fill="currentColor" className="w-5 h-5">
                                <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z"/>
                                <path fillRule="evenodd"
                                      d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                        <div className={"text-sm pl-2 "}>
                            Pay with Card
                        </div>
                    </div>
                </button>
                {orderForm && (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4  py-4">

                        <div>
                            <Input label={"FullName"} type={"text"} {...register('name')} />
                            <p className={"text-sm text-red-500"}>{errors.name && errors.name.message}</p>
                        </div>
                        <div>
                            <Input label={"Phone"} type={"text"} {...register('phone')} />
                            <p className={"text-sm text-red-500"}>{errors.phone && errors.phone.message}</p>
                        </div>
                        <div>
                            <Input label={"Address"} type={"text"} {...register('address')} />
                            <p className={"text-sm text-red-500"}>{errors.address && errors.address.message}</p>
                        </div>
                        <div>
                            <Input label={"Email"} type={"text"} {...register('email')} />
                            <p className={"text-sm text-red-500"}>{errors.email && errors.email.message}</p>
                        </div>
                        <div className={"col-span-2"}>
                            <Button onClick={handleSubmit(handleCashCheckout)}
                                color={"orange"} className={"w-full"}>Confirm Order</Button>
                        </div>
                    </div>
                )}
            </div>
            <PaymentSuccess open={successOrder} handleOpen={() => setSuccessOrder(false)} GoBackURL={"/pharmacien/store"} OrderDetailURL={""}
            title={"Order Done!"} message={"Thank you for completing your order."}/>
        </>
    );
}

export default CheckoutCOD;