import React from 'react';
import {Input} from "@material-tailwind/react";
import {useAdminContext} from "../../../contexts/AdminContext";

const FIELDS_ADMIN_FORM = ['username','name','phone','address','email','password']
const FIELDS_Client_FORM = ['username','name','phone','address','CNN','email','password']
const FIELDS_PHARMACIEN_FORM = ['username','name','phone','address','pharmacy','CNN','email','password']
function UserForm({formContext, register, errors}) {
    const {pharmacy} = useAdminContext()
    return (
        <div className={"grid grid-cols-3 gap-4"}>
            {/* admin */}
            {formContext.formType === 'createAdmin' || formContext.formType === 'editAdmin' || formContext.formType === 'readAdmin' ? (
                FIELDS_ADMIN_FORM.map((field, key) => {
                    const type = formContext.formType;
                    return (
                        <div key={key}>
                            {(type === 'editAdmin' || type === 'readAdmin') && field === "password" ? null : (
                                <div key={key}>
                                    {type === "readAdmin" && <p>{field}</p>}
                                    <Input disabled={type === "readAdmin"} {...register(field)} label={field} type={"text"} />
                                    <p className={"text-sm text-red-500"}>{errors[field]?.message}</p>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : ""}
            {/* client */}
            {formContext.formType === 'createClient' || formContext.formType === 'editClient' || formContext.formType === 'readClient' ? (
                FIELDS_Client_FORM.map((field, key) => {
                    const type = formContext.formType;
                    return (
                        <div key={key}>
                            {(type === 'editClient' || type === 'readClient') && field === "password" ? null : (
                                <div key={key}>
                                    {type === "readClient" && <p>{field}</p>}
                                    <Input disabled={type === "readClient"} {...register(field)} label={field} type={"text"} />
                                    <p className={"text-sm text-red-500"}>{errors[field]?.message}</p>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : ""}

            {formContext.formType === 'createPharmacien' || formContext.formType === 'editPharmacien' || formContext.formType === 'readPharmacien' ? (
                FIELDS_PHARMACIEN_FORM.map((field, key) => {
                    const type = formContext.formType;
                    return (
                        <div key={key}>
                            {(type === 'editPharmacien' || type === 'readPharmacien') && field === "password" ? null : (
                                <div key={key}>
                                    {type === "readPharmacien" && <p>{field}</p>}
                                    {field === 'pharmacy' ? (
                                        <>
                                            <div className="relative">
                                                <select {...register("pharmacy_id")} disabled={type === "readPharmacien"}
                                                        className="block w-full h-10 px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500"
                                                        style={{maxHeight: "15rem"}}>
                                                    <option  disabled selected>Select Pharmacy</option>
                                                    {pharmacy?.map((phar,key)=>(
                                                        <option key={key} value={phar.id}>{phar.name}</option>
                                                    ))}
                                                </select>
                                                <div
                                                    className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10.293 13.707a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className={"text-sm text-red-500"}>{errors[field]?.message}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Input disabled={type === "readPharmacien"} {...register(field)}
                                                   label={field}
                                                   type={"text"}/>
                                            <p className={"text-sm text-red-500"}>{errors[field]?.message}</p>
                                        </>
                                    )}

                                </div>
                            )}
                        </div>
                    );
                })
            ) : ""}
        </div>

    );
}

export default UserForm;