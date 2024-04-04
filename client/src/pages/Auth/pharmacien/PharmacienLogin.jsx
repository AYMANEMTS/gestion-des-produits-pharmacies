import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import authLogo from "../../../assets/authLogo.svg"
import {Input} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {PharmacienApi} from "../../../api/PharmacienApi";
import {SetApiErrors} from "../../../helpers/SetApiErrors";
import toast from "react-hot-toast";
import {useUserContext} from "../../../contexts/AuthContext";
function PharmacienLogin() {
    const {register,handleSubmit,setError,formState:{errors}} = useForm()
    const navigate = useNavigate()
    const {setToken,setUserType,token,userType} = useUserContext()
    useEffect(() => {
        if (token && userType === 'pharmacien'){
            navigate("/pharmacien/store")
        }
    }, [navigate, token, userType]);
    const loginCallback = async (data) => {
        try {
            await PharmacienApi.login(data).then(({data}) => {
                if (!data.status || data.errors){
                    SetApiErrors(data.errors,setError)
                }else {
                    setToken(data.token)
                    setUserType('pharmacien')
                    navigate("/pharmacien/home")
                    toast.success('Welcome Back ')
                }
            }).catch((e) => console.log(e))
        }catch (e) {
            console.error(e)
        }
    }
    return (
        <div className="py-16">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div className="hidden lg:block lg:w-1/2 bg-cover"
                     style={{backgroundImage: `url(${authLogo})`}}>
                </div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Welcome back!</h2>
                    <div className="mt-4">
                       <Input type={"email"} label={"Email"} {...register('email')}/>
                        <p className={"text-red-500 text-sm"}>{errors.email && errors.email.message}</p>
                    </div>
                    <div className="mt-4">
                        <Input type={"password"} label={"Password"} {...register('password')} />
                        <p className={"text-red-500 text-sm"}>{errors.password && errors.password.message}</p>
                    </div>
                    <div className="mt-8">
                        <button onClick={handleSubmit(loginCallback)}
                            className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login
                        </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <Link to={"/pharmacien/register"} className="text-xs text-gray-500 uppercase">or sign in</Link>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PharmacienLogin;