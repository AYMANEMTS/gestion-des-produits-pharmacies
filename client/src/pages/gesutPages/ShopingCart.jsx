import React, {useEffect, useState} from 'react';
import {Typography, Button, CardBody, Card, Menu, MenuHandler, MenuList, MenuItem} from "@material-tailwind/react";
import ShopingCartItems from "../../components/geustComponents/ShopingCartItems";
import RelatedProductSlider from "../../components/geustComponents/RelatedProductSlider";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useStoreContext} from "../../contexts/StoreContext";
import {Link, useNavigate} from "react-router-dom";
import OrderModalDialog from "../../components/clientComponents/OrderModalDialog";
import {axiosClient} from "../../api/axios";
import PaymentSuccess from "../../components/clientComponents/CheckoutItems/PaymentSuccess";
import toast from "react-hot-toast";
import {useUserContext} from "../../contexts/AuthContext";

function ShopingCart() {
    const {cartItems,getTotalPrice,clearShoppingCart} = useShopingCart()
    const {products} = useStoreContext()
    const relatedProducts = products && products?.slice(0,8)
    const [orderModal, setOrderModal] = useState(false)
    const [successPayment, setSuccessPayment] = useState(false)
    const [orderCreatedId, setOrderCreatedId] = useState(null)
    const {token} = useUserContext()
    const navigate = useNavigate()
    const handleCheckout = async () => {
        setSuccessPayment(false)
        try {
            const res = await axiosClient.post("/api/init/payment",{productsData:cartItems,redirectPage:"http://localhost:3000/cart/items"})
            if (res.data.status){
                window.location.href = res.data.url;
            }else console.log(res.data.message)
        }catch (e) {
            console.error(e)
        }
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const session_id = urlParams.get("session_id")
        if (session_id && !successPayment){
            try {
                async function handlePaymentSuccess(){
                    const res = await axiosClient.post("/api/handle/payment/success",{CHECKOUT_SESSION_ID:session_id,
                        type:"client",productsData:cartItems})
                    if (res.data.status){
                        clearShoppingCart()
                        setSuccessPayment(true)
                        setOrderCreatedId(res.data.order.id)
                    }else toast.error("Payment not completed")
                }
                handlePaymentSuccess().catch(e => console.error(e))
            }catch (e) {
                console.log(e)
            }
        }
    }, [cartItems, clearShoppingCart, successPayment]);
    return (
        <>
            {cartItems.length < 1 && (
                <div className={"flex justify-center"}>
                    <Card className="mt-6 w-auto p-5  ">
                        <CardBody>
                            <div className={"flex justify-center items-center"}>
                                <Typography variant={"h2"} color={"gray"}>No Items In Shopping Cart</Typography>
                            </div>
                            <div className={"flex justify-center mt-4"}>
                                <Link to={"/store"} >
                                    <Button variant={"text"} className={"text-xl flex justify-around text-green-500"}>
                                        Go Back to Shopping
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                            className="w-6 h-6 ml-2">
                                            <path fillRule="evenodd"
                                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </Button>
                                </Link>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
            {cartItems.length > 0 && (
                <div>
                    <h1 className="mb-10 text-center text-2xl text-green-500 font-bold">Cart Items
                        ({cartItems.length})</h1>
                    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                        <div className="rounded-lg md:w-2/3">
                            {cartItems.map((item, key) => (
                                <ShopingCartItems item={item} key={key}/>
                            ))}

                        </div>
                        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                            <div className="mb-2 flex justify-between">
                                <p className="text-gray-700">Subtotal</p>
                                <p className="text-gray-700">{getTotalPrice(products)} DH</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Taxes</p>
                                <p className="text-gray-700">0 DH</p>
                            </div>
                            <hr className="my-4"/>
                            <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">{getTotalPrice(products)} DH</p>
                                </div>
                            </div>
                            {token ? (
                                <Menu>
                                    <MenuHandler>
                                        <button
                                            className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-800">Check
                                            out
                                        </button>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem onClick={handleCheckout}>
                                            <div className={"flex"}>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                         fill="currentColor"
                                                         className="w-5 h-5">
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
                                        </MenuItem>
                                        <MenuItem onClick={() => setOrderModal(!orderModal)}>
                                            <div className={"flex"}>
                                                <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                         className="w-5 h-5"
                                                         viewBox="0 0 576 512">
                                                        <path
                                                            d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM128 416H64V352c35.3 0 64 28.7 64 64zM64 224V160h64c0 35.3-28.7 64-64 64zM448 352c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM384 256c0 61.9-43 112-96 112s-96-50.1-96-112s43-112 96-112s96 50.1 96 112zM252 208c0 9.7 6.9 17.7 16 19.6V276h-4c-11 0-20 9-20 20s9 20 20 20h24 24c11 0 20-9 20-20s-9-20-20-20h-4V208c0-11-9-20-20-20H272c-11 0-20 9-20 20z"/>
                                                    </svg>
                                                </div>
                                                <div className={"text-sm pl-2 "}>
                                                    Pay with Cash
                                                </div>
                                            </div>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            ) : (
                                <button onClick={() => navigate("/login", {state: {redirectRoute: "/cart/items"}})}
                                        className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-800">Check
                                    out
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            )}
            <OrderModalDialog handleOpen={() => setOrderModal(!orderModal)} open={orderModal}/>
            <RelatedProductSlider products={relatedProducts}/>
            <PaymentSuccess open={successPayment} handleOpen={() => setSuccessPayment(false)} GoBackURL={"/store"} OrderDetailURL={`/client/order/${orderCreatedId}`}
            title={"Payment Done!"} message={"Thank you for completing your secure online payment."}/>
        </>
    );
}

export default ShopingCart;