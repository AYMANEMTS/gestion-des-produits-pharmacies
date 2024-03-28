import React, {useEffect} from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {AdminApi} from "../../../api/AdminApi";
import {SetApiErrors} from "../../../helpers/SetApiErrors";
import toast from "react-hot-toast";
import {ShowImageFromServer} from "../../../helpers/ShowImageFromServer";
import {useQueryClient} from "react-query";
import {useStoreContext} from "../../../contexts/StoreContext";

function CategoryFormModal({open,setOpen,formContext}) {
    const {setIsLoading} = useStoreContext()
    const handleOpen = () => setOpen(!open);
    const {register,handleSubmit,formState:{errors},setError,reset} = useForm()
    const {isUpdate,data} = formContext
    useEffect(() => {
        if (isUpdate){
            reset({name:data.name})
        }else reset({name: ""})
    }, [isUpdate,data,reset]);
    const queryClient = useQueryClient()
    const handleForm = async (data) => {
        try {
            if (data.image)data.image = data.image[0]
            let res;
            if (formContext.isUpdate) {
                const id = formContext.data.id;
                res = await AdminApi.updateCategory(id, data);
            } else {
                res = await AdminApi.createCategory(data);
            }
            if (res.data.status === false) {
                SetApiErrors(res.data.errors, setError);
            } else {
                handleOpen();
                await queryClient.invalidateQueries("categories");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{formContext.isUpdate?'Update Category':'Create Category'}</DialogHeader>
                <DialogBody>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>
                            <Input label={"Name"} type={"text"} {...register('name')} />
                            <p className={"text-sm text-red-500"}>{errors.name && errors.name.message}</p>
                        </div>
                        <div>
                            <Input label={"Image"} type={"file"} {...register('image')} onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        document.getElementById("categoryImage").src = reader.result
                                    }
                                    reader.readAsDataURL(file);
                                }
                            }}/>
                            <p className={"text-sm text-red-500"}>{errors.image && errors.image.message}</p>
                        </div>
                        <div>
                        <img src={ShowImageFromServer(formContext.data?.image)} alt={""} id={"categoryImage"}/>
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
                    <Button  variant="gradient" color="green" onClick={handleSubmit(handleForm)}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default CategoryFormModal;