import React, {useEffect, useState} from "react";
import authLogo from "../../../assets/authLogo.svg"
import { Checkbox, Input} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AdminApi} from "../../../api/AdminApi";
import {PharmacienApi} from "../../../api/PharmacienApi";
import {SetApiErrors} from "../../../helpers/SetApiErrors";
import SuccessRegisterComponent from "./SuccessRegisterComponent";

function PharmacienRegister() {
    const {register,handleSubmit,setValue,setError,formState:{errors},reset} = useForm({defaultValues:{
            username:null,email:null,phone:null,CNN:null,password:null,pharmacy_id:null,
        }})
    const [pharmacies, setPharmacies] = useState([])
    const [newPharmacyForm, setNewPharmacyForm] = useState(false)
    const [successregister, setSuccessregister] = useState(false)
    useEffect(() => {
        try {
            async function getPharmacies(){
                const res = await AdminApi.getPharmacy()
                setPharmacies(res.data.data)
            }
            getPharmacies().catch(e => console.error(e))
        }catch (e) {
            console.error(e)
        }
    }, []);
    const handleSignUp = async (data) => {
        try {
            if (!data.newPharmacy && data.pharmacy_id === null){
                setError('pharmacy_id',{type:"custom",message:"if you not have pharmacy click to other"})
            }else {
                const res = await PharmacienApi.register(data).catch(e => console.error(e))
                if (!res.data.status){
                    SetApiErrors(res.data.errors,setError)
                }else {
                    setSuccessregister(true)
                }
            }
        }catch (e) {
            console.error(e)
        }
    }
    const resetForm = () => {
        reset({})
    }
    return (
        <>
            <div className="py-16">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="hidden lg:block lg:w-1/2 bg-cover"
                         style={{backgroundImage: `url(${authLogo})`}}>
                    </div>
                    <div className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">Welcome back!</h2>
                        <div className="mt-4">
                            <Input type={"text"} label={"Username"} {...register('username')} />
                            <p className={"text-sm text-red-500"}>{errors.username && errors.username.message}</p>
                        </div>
                        <div className="mt-4">
                            <Input type={"text"} label={"Email"} {...register('email')}/>
                            <p className={"text-sm text-red-500"}>{errors.email && errors.email.message}</p>
                        </div>
                        <div className="mt-4">
                            <Input type={"text"} label={"Phone number"} {...register('phone')}/>
                            <p className={"text-sm text-red-500"}>{errors.phone && errors.phone.message}</p>
                        </div>
                        <div className="mt-4">
                            <Input type={"text"} label={"CNN"} {...register('CNN')}/>
                            <p className={"text-sm text-red-500"}>{errors.CNN && errors.CNN.message}</p>
                        </div>
                        <div className="mt-4">
                            <Input type={"text"} label={"Password"} {...register('password')}/>
                            <p className={"text-sm text-red-500"}>{errors.password && errors.password.message}</p>
                        </div>
                        <div className="mt-4 flex">
                            <select id="dropdown" {...register('pharmacy_id')} onChange={() => {
                                setNewPharmacyForm(false)
                                setValue('newPharmacy', false)
                            }}
                                    className="block w-full mt-1 px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none">
                                <option value="">Select your pharmacy</option>
                                {pharmacies?.map((pharmcy, key) => (
                                    <option key={key} value={pharmcy.id}>{pharmcy.name}</option>
                                ))}
                            </select>

                            <Checkbox {...register('newPharmacy')} label={"Other"} onChange={(e) => {
                                setValue('pharmacy_id', "")
                                setNewPharmacyForm(e.currentTarget.checked)
                            }}/>
                        </div>
                        <p className={"text-sm text-red-500 mt-2"}>{errors.pharmacy_id && errors.pharmacy_id.message}</p>
                        {newPharmacyForm && (<>
                            <div className={"mt-4"}>
                                <Input type={"text"} label={"Pharmacy Name"} {...register('name')} />
                                <p className={"text-sm text-red-500"}>{errors.name && errors.name.message}</p>
                            </div>
                            <div className={"mt-4"}>
                                <Input type={"text"} label={"Pharmacy Address"} {...register('address')} />
                                <p className={"text-sm text-red-500"}>{errors.address && errors.address.message}</p>
                            </div>
                            <div className={"mt-4"}>
                                <Input type={"text"} label={"Pharmacy Contact"} {...register('contact')} />
                                <p className={"text-sm text-red-500"}>{errors.contact && errors.contact.message}</p>
                            </div>
                        </>)}
                        <div className="mt-8">
                            <button onClick={handleSubmit(handleSignUp)}
                                    className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 w-full rounded ">Register
                            </button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4"></span>
                            <Link to={"/pharmacien/login"} className="text-xs text-gray-500 uppercase">or sign up</Link>
                            <span className="border-b w-1/5 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
            {successregister && <SuccessRegisterComponent handleOpen={() => setSuccessregister(!successregister)} resetForm={resetForm} />}
        </>
    );
}

export default PharmacienRegister;