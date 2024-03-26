import React, {useEffect} from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import ProductsForm from "./ProductsForm";
import {useForm} from "react-hook-form";
import {AdminApi} from "../../../api/AdminApi";
import {SetApiErrors} from "../../../helpers/SetApiErrors";
import toast from "react-hot-toast";
import {useQueryClient} from "react-query";

export function ProductDialog({open ,handleOpen ,formContext,readOnly}) {
    const productData = formContext?.productData
    const { register, handleSubmit, reset, setError,formState:{errors}} = useForm();

    useEffect(() => {
        if (productData) {
            reset({
                name: productData.name || "",
                description: productData.description || "",
                prix_achat: productData.prix_achat || "",
                prix_vendre: productData.prix_vendre || "",
                qty: productData.qty || "",
                category_id: productData.category_id || "",
                fourniseur_id: productData.fourniseur_id || "",
                date_exp: productData.date_exp || "",
                date_fab: productData.date_fab || "",
                image: null,
            });
        }
    }, [productData, reset]);
    const queryClient = useQueryClient()
    const handlForm = async (data) => {
        if (data?.image?.length >= 0){
            data.image = data['image'][0]
        }
        const formType = formContext?.formType
        if (formType === 'create'){
            const res = await AdminApi.productStore(data).catch((e) => console.log(e))
            if (!res.data.status || res.data.errors){
                SetApiErrors(res.data.errors,setError)
            }
            if (res.data.status){
                handleOpen()
                await queryClient.invalidateQueries(['products',1])
                toast.success(res.data.message)
            }
        }else if(formType === 'update'){
            const id = formContext.productData.id
            const res = await AdminApi.productUpdate(id,data).catch((e) => console.log(e))
            if (!res.data.status || res.data.errors){
                SetApiErrors(res.data.errors,setError)
            }
            if (res.data.status){
                handleOpen()
                await queryClient.invalidateQueries(['products',1])
                toast.success(res.data.message)
            }
        }

    }
    return (
        <>
            <Dialog  open={open} handler={handleOpen}>
                <DialogHeader>
                    {readOnly?`Product: ${productData?.name}`:(
                        formContext.formType === 'create' ? 'Add New Product'
                                : `Update Product (${formContext.productData.name})`
                    )}

                </DialogHeader>
                <DialogBody className={" "}>
                        <ProductsForm formContext={formContext} register={register} errors={errors}
                        readOnly={readOnly}/>
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
                    <Button variant="gradient" color="green" onClick={() => {
                        if (readOnly){
                            handleOpen()
                        }else {
                            handleSubmit(handlForm)
                        }
                    }}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}