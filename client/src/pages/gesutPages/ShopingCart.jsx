import React from 'react';
import {Typography, Button, CardBody, Card} from "@material-tailwind/react";
import ShopingCartItems from "../../components/geustComponents/ShopingCartItems";
import RelatedProductSlider from "../../components/geustComponents/RelatedProductSlider";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useStoreContext} from "../../contexts/StoreContext";
import {Link} from "react-router-dom";

function ShopingCart() {
    const {cartItems,getTotalPrice} = useShopingCart()
    const {products} = useStoreContext()
    const relatedProducts = products && products?.slice(0,8)
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
                                <p className="text-gray-700">{getTotalPrice(products).toFixed(2)} DH</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Taxes</p>
                                <p className="text-gray-700">0 DH</p>
                            </div>
                            <hr className="my-4"/>
                            <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                                <div className="">
                                    <p className="mb-1 text-lg font-bold">{getTotalPrice(products).toFixed(2)} DH</p>
                                </div>
                            </div>
                            <Link to={"/client/checkout"}>
                                <button
                                    className="mt-6 w-full rounded-md bg-green-500 py-1.5 font-medium text-blue-50 hover:bg-green-800">Check
                                    out
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <RelatedProductSlider products={relatedProducts}/>
        </>
    );
}

export default ShopingCart;