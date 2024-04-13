import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {AdminApi} from "../../../api/AdminApi";
import {SetApiErrors} from "../../../helpers/SetApiErrors";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useUserContext} from "../../../contexts/AuthContext";

function AdminLogin() {
    const {register,handleSubmit,setError,formState:{errors,isSubmitting}} = useForm()
    const navigate = useNavigate()
    const { token,userType,setToken,setUserType} = useUserContext()
    useEffect(() => {
        if (token && userType === 'admin'){
            navigate("/admin/home")
        }
    }, [navigate, token, userType]);
    const loginCallback = async (data) => {
        await AdminApi.login(data).then(({data}) => {
            if (!data.success || data.errors){
                SetApiErrors(data.errors,setError)
            }else {
                setToken(data.token)
                setUserType('admin')
                navigate("/admin/home")
                toast.success('Welcome Back ')
            }
        }).catch((e) => console.log(e))
    }
    useEffect(() => {
        if (token && userType === 'admin' ){
            navigate("/admin/home")
        }
    }, [navigate, token, userType]);
    return (
        <>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Welcome back</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div
                                    className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input {...register('email')}
                                            autoComplete="off" id="email" name="email" type="text"
                                               className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                               placeholder="Email address"/>
                                        <label htmlFor="email"
                                               className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email
                                            Address</label>
                                        <p className={"text-sm text-red-500"}>{errors.email && errors.email.message}</p>
                                    </div>
                                    <div className="relative">
                                        <input {...register('password')}
                                               autoComplete="off" id="password" name="password" type="password"
                                               className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                               placeholder="Password"/>
                                        <label htmlFor="password"
                                               className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                        <p className={"text-sm text-red-500"}>{errors.password && errors.password.message}</p>
                                    </div>
                                    <div className="relative">
                                        <button disabled={isSubmitting} onClick={handleSubmit(loginCallback)}
                                            className={`bg-green-500 ${isSubmitting && 'bg-gray-600'} hover:bg-green-800 w-full text-white rounded-md px-2 py-1`}>
                                            Login</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminLogin;