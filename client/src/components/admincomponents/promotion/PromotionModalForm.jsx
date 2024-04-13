import React from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {AdminApi} from "../../../api/AdminApi";
import {useNavigate} from "react-router-dom";
import {SetApiErrors} from "../../../helpers/SetApiErrors";

function PromotionModalForm({open,handleOpen,selectedProducts}) {
    const {register,handleSubmit,setError,formState:{errors}} = useForm()
    const navigate = useNavigate()
    const handlePromotion = async (data) => {
        data.productsIds = selectedProducts
        try {
            const res = await AdminApi.storePromotion(data).catch((e) => console.log(e))
            if (res.data.status){
                navigate("/admin/promotion")
            }else if (!res.data.status){
                SetApiErrors(res.data.errors,setError)
            }
        }catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>
                    <Typography variant={"h5"}>
                        Add New Promotion
                    </Typography>
                </DialogHeader>
                <DialogBody>
                    <div className={"py-4 pl-2"}>
                        <div className={"grid grid-cols-2 gap-4 py-4"}>
                            <div>
                                <small className={"opacity-50"}>Optional</small>
                                <Input type={"text"} label={"Name"} {...register('name')} />
                                <p className={"text-sm text-red-500"}>{errors.name && errors.name.message}</p>
                            </div>
                            <div>
                                <small className={"opacity-50"}>Required</small>
                                <Input type={"number"} label={"Pourcentage"} {...register('pourcentage')} />
                                <p className={"text-sm text-red-500"}>{errors.pourcentage && errors.pourcentage.message}</p>
                            </div>
                            <div className={"col-span-2"}>
                            Selected Products: {selectedProducts.length}
                            </div>
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
                    <Button variant="gradient" color="green" onClick={handleSubmit(handlePromotion)}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default PromotionModalForm;