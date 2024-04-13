import React, {useEffect} from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import UserForm from "./UserForm";
import {useForm} from "react-hook-form";
import {AdminApi} from "../../../api/AdminApi";
import {ClientApi} from "../../../api/ClientApi";
import {SetApiErrors} from "../../../helpers/SetApiErrors";
import toast from "react-hot-toast";
import {useQueryClient} from "react-query";

function UserDialoge({open,handleOpen,formContext,setFormContext}) {
    const {register,reset,handleSubmit,formState:{errors},setError} = useForm()
    const {formData} = formContext
    useEffect(() => {
        if (formData){
            reset({
                username:formData?.username,
                name:formData?.name,
                phone:formData?.phone,
                address:formData?.address,
                email:formData?.email,
                CNN:formData?.CNN,
                pharmacy_id:formData?.pharmacy?.id
            })
        }
    }, [formData,reset]);
    const queryClient = useQueryClient()
    const handllForm = async (data) => {
        const {formType , formData} = formContext
        const id = formData.id
        try {
            switch (formType) {
                case "createAdmin":
                    await AdminApi.createAdmin(data).then((res) => {
                        if (!res?.data?.success || res?.data?.errors){
                            SetApiErrors(res.data.errors,setError)
                        }else if (res?.data?.success || res?.data?.message){
                            setFormContext({formData: {},formType:null})
                            handleOpen()
                            queryClient.invalidateQueries('users')
                            toast.success("Admin Created successFully")
                        }
                    }).catch((e) => console.log(e))
                    break
                case "editAdmin":
                    await AdminApi.updateAdmin(id,data).then((res) => {
                        if (!res?.data?.success || res?.data?.errors){
                            SetApiErrors(res.data.errors,setError)
                        }else if (res?.data?.success || res?.data?.message){
                            setFormContext({formData: {},formType:null})
                            handleOpen()
                            queryClient.invalidateQueries('users')
                            toast.success("Admin Updated successFuly")
                        }
                    }).catch((e) => console.log(e))
                    break
                case "createClient":
                    await ClientApi.register(data).then((res) => {
                        if (!res?.data?.success || res?.data?.errors){
                            SetApiErrors(res.data.errors,setError)
                        }else if (res?.data?.success || res?.data?.message){
                            setFormContext({formData: {},formType:null})
                            handleOpen()
                            queryClient.invalidateQueries('users')
                            toast.success("Client Created successFuly")
                        }
                    }).catch((e) => console.log(e))
                    break
                case "editClient":
                    await AdminApi.updateClient(id,data).then((res) => {
                        if (!res?.data?.success || res?.data?.errors){
                            SetApiErrors(res.data.errors,setError)
                        }else if (res?.data?.success || res?.data?.message){
                            setFormContext({formData: {},formType:null})
                            handleOpen()
                            queryClient.invalidateQueries('users')
                            toast.success("Client Updated successFuly")
                        }
                    }).catch((e) => console.log(e))
                    break
                case "createPharmacien":
                    await AdminApi.createPharmacien(data).then((res) => {
                        if (!res?.data?.success || res?.data?.errors){
                            SetApiErrors(res.data.errors,setError)
                        }else if (res?.data?.success || res?.data?.message){
                            setFormContext({formData: {},formType:null})
                            handleOpen()
                            queryClient.invalidateQueries('users')
                            toast.success("Pharmacien Created successFully")
                        }
                    }).catch((e) => console.log(e))
                    break
                case "editPharmacien":
                    await AdminApi.updatePharmacien(id,data).then((res) => {
                        if (!res?.data?.success || res?.data?.errors){
                            SetApiErrors(res.data.errors,setError)
                        }else if (res?.data?.success || res?.data?.message){
                            setFormContext({formData: {},formType:null})
                            handleOpen()
                            queryClient.invalidateQueries('users')
                            toast.success("Pharmacien Updated successFuly")
                        }
                    }).catch((e) => console.log(e))
                    break
                default:
                    break
            }
        }catch (e){
            console.log(e)
        }
    }
    return (
        <Dialog size={"xl"} open={open} handler={handleOpen}>
            <DialogHeader>
                {formContext.formType === 'createAdmin' && 'Create Admin'}
                {formContext.formType === 'createClient' && 'Create Client'}
                {formContext.formType === 'createPharmacien' && 'Create Pharmacien'}
                {formContext.formType === 'editPharmacien' && `Edit Pharmacien (${formContext?.formData?.username})`}
                {formContext.formType === 'editAdmin' && `Edit Admin (${formContext?.formData?.username})`}
                {formContext.formType === 'editClient' && `Edit Client (${formContext?.formData?.username})`}
                {formContext.formType === 'readAdmin' || formContext.formType === 'readClient' || formContext.formType === 'readPharmacien' ? (
                    `Details: (${formContext.formData.username})`
                ):""}
            </DialogHeader>
            <DialogBody className={" "}>
                <UserForm formContext={formContext} register={register} errors={errors}/>
            </DialogBody>
            <DialogFooter>
                <Button onClick={() => {
                    setFormContext({formType:null,formData:{}})
                    handleOpen()
                }}
                    variant="text"
                    color="red"
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleSubmit(handllForm)}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}

export default UserDialoge;