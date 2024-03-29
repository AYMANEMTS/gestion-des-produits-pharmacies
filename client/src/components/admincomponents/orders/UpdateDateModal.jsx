import React, {useEffect, useState} from 'react';
import {
    Button,

    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader, Input,
    MenuItem,
    Typography
} from "@material-tailwind/react";
import {useQueryClient} from "react-query";
import {useForm} from "react-hook-form";
import {AdminApi} from "../../../api/AdminApi";
import toast from "react-hot-toast";
import {SetApiErrors} from "../../../helpers/SetApiErrors";

function UpdateDateModal({data,type}) {
    const {register,reset,handleSubmit,setError,formState:{errors}} = useForm()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (data){
            reset({
                date_livred: data?.date_livred,
                date_livred_prevenu: data?.date_livred_prevenu
            })
        }
    }, [data,reset]);
    const handleOpen = () => setOpen(!open)
    const queryclient = useQueryClient()
    const id = data.id
    const handlRequest = async (data) => {
         data.type = type
        try {
            const res = await AdminApi.updateOrderDate(id,data)
            if (res.data.status){
                handleOpen()
                toast.success(res.data.message)
                await queryclient.invalidateQueries(["orders",type])
            }else {
                SetApiErrors(res.data.errors,setError)
            }
        }catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <MenuItem onClick={handleOpen} className="flex items-center   ">
                <Typography>
                    Update Date
                </Typography>
            </MenuItem>
            <Dialog size={"xs"} open={open} handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader className={"capitalize"}>Update Date For  {type} Order</DialogHeader>
                <DialogBody>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>
                            <Input type={"date"} label={"Date Preveu"} {...register('date_livred_prevenu')} />
                            <p className={"text-sm text-red-500"}>{errors.date_livred_prevenu && errors.date_livred_prevenu.message}</p>
                        </div>
                        <div>
                            <Input type={"date"} label={"Date Livred"} {...register("date_livred")} />
                            <p className={"text-sm text-red-500"}>{errors.date_livred && errors.date_livred.message}</p>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit(handlRequest)}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>

    );
}

export default UpdateDateModal;