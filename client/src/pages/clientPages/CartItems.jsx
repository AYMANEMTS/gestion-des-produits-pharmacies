import React from 'react';
import { Typography, Button, CardBody,  Card} from "@material-tailwind/react";
import CartItemTable from "../../components/geustComponents/CartItemTable";
import RelatedProductSlider from "../../components/geustComponents/RelatedProductSlider";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useStoreContext} from "../../contexts/StoreContext";
import {Link} from "react-router-dom";

function CartItems() {
    const {cartItems,getTotalPrice} = useShopingCart()
    const {products} = useStoreContext()
    const relatedProducts = products.slice(0,8)
    return (
        <>
            <div className={"flex justify-between"}>
                <Typography variant={"h4"} className={"ml-2 font-normal"}>Cart Items (8)</Typography>
                <Button className={"w-1/5 bg-green-500 rounded-full hover:bg-green-800"}>Checkout</Button>
            </div>
            <div className="flex justify-start w-full my-8">
                <table className="w-full border-collapse ">
                    <tbody className={""}>
                        {cartItems.map((item,key) => (
                            <CartItemTable key={key} item={item}/>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={"flex my-10 justify-center"}>
                {cartItems.length > 0 ? (
                    <Card color="" shadow={false} className="w-full max-w-[40rem] bg-gray-300 p-4">
                        <CardBody className="mb- p-0">
                            <div className={"flex justify-between text-black text-xl font-normal "}>
                                <div>SubTotal</div>
                                <div>{getTotalPrice(products).toFixed(2)} DH</div>
                            </div>
                            <div className={"flex justify-between text-md text-blue-gray-800 font-normal my-2"}>
                                <div>Frais de livraison</div>
                                <div>0 DH</div>
                            </div>
                            <hr/>
                            <div className={"flex justify-between text-2xl font-normal text-green-500 mt-4"}>
                                <div>Total</div>
                                <div>{getTotalPrice(products).toFixed(2)} DH</div>
                            </div>
                            <div className={"flex justify-center mt-3 "}>
                                <Button className={"bg-green-500 w-full hover:bg-green-800 rounded-full"}>
                                    Go to Checkout</Button>
                            </div>
                        </CardBody>
                    </Card>
                ):(
                    <Card color="" shadow={true} className="w-full max-w-[40rem] bg-gray-300 p-4">
                        <CardBody>
                            <div className="flex flex-col items-center justify-center">
                                <div className="mb-4 text-center">
                                    <Typography variant="h1" color="green">No Items in Cart</Typography>
                                </div>
                                <div>
                                    <Link to={"/store"}>
                                        <Button className={"bg-green-500 hover:bg-green-800 text-white"}>
                                            Go To Shopping
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardBody>

                    </Card>
                )}

            </div>
            <div className={"flex justify-center text-green-500 text-2xl font-bold mb-2"}>Populaire Products</div>
            <RelatedProductSlider products={relatedProducts} />
        </>
    );
}

export default CartItems;