import React from 'react';
import {Button, Drawer, IconButton, Typography} from "@material-tailwind/react";
import ShopingCartitems from "../pharmacienComponenet/ShopingCartitems";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useNavigate} from "react-router-dom";

function ShopingDrawer({closeDrawer,open}) {
    const {cartItems} = useShopingCart()
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Drawer
                open={open} onClose={closeDrawer} placement={"right"} className=" ">
                <div className="mb-6 flex items-center justify-between ">
                    <Typography variant="h5" color="green" className={"p-4"}>
                        Shoping Cart Items
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <ShopingCartitems closeDrawer={closeDrawer}/>
                {cartItems.length > 0 && (
                    <div className={"my-3 mx-5"}>
                        <Button onClick={() => {
                            closeDrawer()
                            navigate("/pharmacien/checkout")
                        }}
                            color={"green"} className={"w-full"}>Go To Checkout</Button>
                    </div>
                )}
            </Drawer>
        </React.Fragment>
    );
}


export default ShopingDrawer;