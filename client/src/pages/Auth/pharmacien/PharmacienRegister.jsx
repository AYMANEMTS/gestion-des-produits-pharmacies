import React, {useState} from "react";
import authLogo from "../../../assets/authLogo.svg"
import {Button, Checkbox, Input} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

function PharmacienRegister() {
    const {register} = useForm({defaultValues:{
            username:null,email:null,phone:null,CNN:null,password:null,pharmacy_id:null,
        }})
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
                        </div>
                        <div className="mt-4">
                            <Input type={"text"} label={"Email"} {...register('email')}/>
                        </div>
                        <div className="mt-4">
                            <Input type={"text"} label={"Phone number"} {...register('phone')}/>
                        </div>
                        <div className="mt-4">
                            <Input type={"text"} label={"CNN"} {...register('CNN')}/>
                        </div>
                        <div className="mt-4">
                            <Input type={"text"} label={"Password"} {...register('password')}/>
                        </div>
                        <div className="mt-4 flex">
                            <select id="dropdown" {...register('pharmacy_id')}
                                    className="block w-full mt-1 px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none">
                                <option value="">Select your pharmacy</option>
                                <option value="uppercase">Uppercase</option>
                                <option value="lowercase">Lowercase</option>
                                <option value="camelcase">Camel Case</option>
                                <option value="kebabcase">Kebab Case</option>
                            </select>
                            <Checkbox label={"Other"} />
                        </div>
                        <div className="mt-8">
                            <button
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
        </>
    );
}

export default PharmacienRegister;