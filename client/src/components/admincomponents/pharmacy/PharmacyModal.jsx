import React from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {useQueryClient} from "react-query";
import PharmacyForm from "./PharmacyForm";
import {AdminApi} from "../../../api/AdminApi";
import {SetApiErrors} from "../../../helpers/SetApiErrors";
import toast from "react-hot-toast";
function PharmacyModal({open,handleOpen,formContext}) {

    const {register,handleSubmit,formState:{errors},setError,reset} = useForm()
    const {isUpdate,data} = formContext
    const queryClient = useQueryClient()
    const id = data?.id
    const handleForm = async (data) => {
        try {
            let res
            if (isUpdate){
                res = await AdminApi.updatePharmacy(id,data)
            }else {
                res = await AdminApi.createPharmacy(data)
            }
            if (res.data.status === false) {
                SetApiErrors(res.data.errors, setError);
            } else {
                handleOpen();
                await queryClient.invalidateQueries("pharmacy");
                toast.success(res.data.message);
            }
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{formContext.isUpdate?'Update Pharmacy':'Create Pharmacy'}</DialogHeader>
                <DialogBody>
                    <PharmacyForm errors={errors} register={register} formContext={formContext} reset={reset}/>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button  variant="gradient" color="green" onClick={handleSubmit(handleForm)}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default PharmacyModal;