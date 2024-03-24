import React from 'react';
import {
    Dialog,
    DialogBody,

} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useShopingCart} from "../../../contexts/ShopingCartContext";

export default function PaymentSuccess({open,handleOpen}) {
    const {clearShoppingCart} = useShopingCart()
    const navigate = useNavigate()
    return (
        <>
            <Dialog open={open} handler={() => {
                handleOpen()
                clearShoppingCart()
            }}>
                <DialogBody>
                    <div className="bg-gray-100 ">
                        <div className="bg-white p-6  md:mx-auto">
                            <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                                <path fill="currentColor"
                                      d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                                </path>
                            </svg>
                            <div className="text-center">
                                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment
                                    Done!</h3>
                                <p className="text-gray-600 my-2">Thank you for completing your secure online
                                    payment.</p>
                                <p> Have a great day! </p>
                                <div className="py-10 text-center">
                                    <a href={""} onClick={() => {
                                        clearShoppingCart()
                                        navigate("/client/orders")
                                    }}
                                       className="px-12 mr-1 rounded bg-green-500 hover:bg-green-800 text-white font-semibold py-3">
                                        Show Order
                                    </a>
                                    <a href="#" onClick={() => {
                                        handleOpen()
                                        clearShoppingCart()
                                    }}
                                       className="px-12 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                                        GO BACK
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogBody>
            </Dialog>
        </>
    );
}