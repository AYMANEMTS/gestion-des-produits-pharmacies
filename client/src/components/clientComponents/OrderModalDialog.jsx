import React, {useState} from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {ClientApi} from "../../api/ClientApi";
import {SetApiErrors} from "../../helpers/SetApiErrors";
import PaymentSuccess from "./CheckoutItems/PaymentSuccess";

function OrderModalDialog({open,handleOpen}) {
    const {register,formState:{errors},handleSubmit,setError} = useForm()
    const {cartItems} = useShopingCart()
    const [successOrder, setSuccessOrder] = useState(false)
    const handleOrder = async (data) => {
        try {
            data.productsWithQty = cartItems
            const res = await ClientApi.storeOrder(data).catch((e) => console.error(e))
            if (!res.data.status){
                SetApiErrors(res.data.errors,setError)
            }else{
                handleOpen()
                setSuccessOrder(true)
            }
        }catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Confirm your order.</DialogHeader>
                <DialogBody>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>
                            <Input label={"Full Name"} type={"text"} {...register('name')}  />
                            <p className={"text-sm text-red-500"}>{errors.name && errors.name.message}</p>
                        </div>
                        <div>
                            <Input label={"Email"} type={"email"} {...register('email')}  />
                            <p className={"text-sm text-red-500"}>{errors.email && errors.email.message}</p>
                        </div>
                        <div>
                            <Input label={"Address"} type={"text"} {...register('address')} />
                            <p className={"text-sm text-red-500"}>{errors.address && errors.address.message}</p>
                        </div>
                        <div>
                            <Input label={"Phone"} type={"number"} {...register('phone')}  />
                            <p className={"text-sm text-red-500"}>{errors.phone && errors.phone.message}</p>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit(handleOrder)}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <PaymentSuccess open={successOrder} handleOpen={() => setSuccessOrder(false)} GoBackURL={"/store"} OrderDetailURL={""}
                            title={"Order Done!"} message={"Thank you for completing your Order."}/>
        </>
    );
}

export default OrderModalDialog;