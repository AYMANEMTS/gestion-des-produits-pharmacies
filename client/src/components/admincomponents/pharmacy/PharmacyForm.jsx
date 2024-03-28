import React, {useEffect} from 'react';
import {Input, Textarea} from "@material-tailwind/react";

function PharmacyForm({register,errors,formContext,reset}) {
    const {isUpdate,data} = formContext
    useEffect(() => {
        if (isUpdate){
            reset({
                name: data.name,
                address: data.address,
                contact: data.contact,
                percentage: data.percentage
            })
        }else reset({
            name: "",
            address:  "",
            contact:  "",
            percentage:  ""
        })
    }, [isUpdate,data,reset]);
    return (
        <>
            <div className={"grid grid-cols-2 gap-4"}>
                <div>
                    <Input label={"Name"} type={"text"} {...register('name')} />
                    <p className={"text-sm text-red-500"}>{errors.name && errors.name.message}</p>
                </div>
                <div>
                    <Input label={"Contact"} type={"text"} {...register('contact')} />
                    <p className={"text-sm text-red-500"}>{errors.contact && errors.contact.message}</p>
                </div>

                <div >
                    <Input label={"Percentage"} {...register('percentage')} />
                    <p className={"text-sm text-red-500"}>{errors.percentage && errors.percentage.message}</p>
                </div>
                <div className={""}>
                    <Textarea label={"Address"} type={"text"} {...register('address')} />
                    <p className={"text-sm text-red-500"}>{errors.address && errors.address.message}</p>
                </div>

            </div>
        </>
    );
}

export default PharmacyForm;