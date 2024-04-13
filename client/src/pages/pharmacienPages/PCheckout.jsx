import React, {useEffect, useState} from 'react';
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useAdminContext} from "../../contexts/AdminContext";
import CheckoutProduct from "../../components/pharmacienComponenet/CheckoutProduct";

import CheckoutCOD from "../../components/pharmacienComponenet/CheckoutCOD";
import {useNavigate} from "react-router-dom";
import PaymentSuccess from "../../components/clientComponents/CheckoutItems/PaymentSuccess";
import {axiosClient} from "../../api/axios";
import toast from "react-hot-toast";
function PCheckout() {
    const {cartItems,clearShoppingCart} = useShopingCart()
    const {products} = useAdminContext()
    const navigate = useNavigate()
    const [successPayment, setSuccessPayment] = useState(false)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const session_id = urlParams.get("session_id")
        if (cartItems.length < 1) navigate("/pharmacien/store")
        if (session_id && !successPayment){
            try {
                async function handlePaymentSuccess(){
                    const res = await axiosClient.post("/api/handle/payment/success",{CHECKOUT_SESSION_ID:session_id,
                        type:"pharmacien",productsData:cartItems})
                    if (res.data.status){
                        setSuccessPayment(true)
                    }else toast.error("Payment not completed")
                }
                handlePaymentSuccess().catch(e => console.error(e))
            }catch (e) {
                console.log(e)
            }
        }
    }, [cartItems, navigate, successPayment]);
    return (
        <>
            <div className="grid  lg:grid-cols-2 ">
                <div className="px-4">
                    <div className="space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        {cartItems.map((item,key) => {
                            const product = products.filter((pd) => pd.id === item.id)
                            return (
                                <CheckoutProduct key={key} item={item} product={product[0]} />
                            )
                        })}
                    </div>
                </div>
                <CheckoutCOD />
            </div>
            <PaymentSuccess open={successPayment} handleOpen={() => setSuccessPayment(false)} GoBackURL={"/pharmacien/store"} OrderDetailURL={""}
            title={"Payment Done!"} message={"Thank you for completing your secure online payment."}/>
        </>
    );
}

export default PCheckout;