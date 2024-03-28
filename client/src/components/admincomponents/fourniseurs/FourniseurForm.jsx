import React, {useEffect} from 'react';
import {Input, Textarea} from "@material-tailwind/react";

function FourniseurForm({register,errors,formContext,reset}) {
    const {isUpdate,data} = formContext
    useEffect(() => {
        if (isUpdate){
            reset({
                name: data.name,
                phone: data.phone,
                address: data.address,
                contact: data.contact,
                description: data.description
            })
        }else reset({
            name: "",
            phone:  "",
            address:  "",
            contact:  "",
            description:  ""
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
                    <Input label={"Phone"} type={"text"} {...register('phone')} />
                    <p className={"text-sm text-red-500"}>{errors.phone && errors.phone.message}</p>
                </div>

                <div>
                    <Input label={"Address"} type={"text"} {...register('address')} />
                    <p className={"text-sm text-red-500"}>{errors.address && errors.address.message}</p>
                </div>

                <div>
                    <Input label={"Contact"} type={"text"} {...register('contact')} />
                    <p className={"text-sm text-red-500"}>{errors.contact && errors.contact.message}</p>
                </div>

                <div className={"col-span-2"}>
                    <Textarea label={"Address"} {...register('description')} />
                    <p className={"text-sm text-red-500"}>{errors.description && errors.description.message}</p>
                </div>
            </div>
        </>
    );
}

export default FourniseurForm;