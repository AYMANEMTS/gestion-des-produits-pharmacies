import authSvg from "../../../assets/authLogo2.jpg"
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ClientApi} from "../../../api/ClientApi";
import {SetApiErrors} from "../../../helpers/SetApiErrors";
import toast from "react-hot-toast";

function Signup() {
    const {register,handleSubmit,setError,formState:{errors}} = useForm()
    const navigate = useNavigate()
    const registerCallBack = async (data) => {
        await ClientApi.register(data).then(({data}) => {
            if (!data.success){
                SetApiErrors(data.errors,setError)
            }else{
                toast.success(data.message)
                navigate("/login")
            }
        })
    }
    return (
        <>
            <div className="flex h-screen my-28">
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <div className="max-w-md text-center">
                        <img src={authSvg} className={"object-fill"} style={{height:'37rem'}} alt={"logo"}/>
                    </div>
                </div>
                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-md w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-center" style={{color:'#2A886E'}}>Sign Up</h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community with
                            all time access and free </h1>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="username"
                                       className="block text-sm font-medium text-gray-700">Username</label>
                                <input {...register('username')}
                                    type="text" id={"username"} placeholder={"username"}
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                <p className={"text-red-500 text-xs p-2"}>{errors.username && errors.username.message}</p>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input {...register('email')}
                                       type="text" placeholder={"email"} id={"email"}
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                <p className={"text-red-500 text-xs p-2"}>{errors.email && errors.email.message}</p>
                            </div>
                            <div>
                                <label htmlFor="CNN" className="block text-sm font-medium text-gray-700">CNN</label>
                                <input {...register('CNN')}
                                       type="text" placeholder={"CNN"} id={"CNN"}
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                <p className={"text-red-500 text-xs p-2"}>{errors.CNN && errors.CNN.message}</p>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="text" id={"phone"} {...register('phone')} placeholder={"phone "}
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                <p className={"text-red-500 text-xs p-2"}>{errors.phone && errors.phone.message}</p>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" {...register('password')} placeholder={"password"}
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                <p className={"text-red-500 text-xs p-2"}>{errors.password && errors.password.message}</p>
                            </div>
                            <div>
                                <button type="submit" onClick={handleSubmit(registerCallBack)}
                                        className="w-full text-white p-2 rounded-md bg-green-500 hover:bg-green-800 ">Sign
                                    Up
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>Already have an account? <Link to={"/login"} className="text-black hover:underline">Login
                                here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;