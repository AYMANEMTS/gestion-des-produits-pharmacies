import authSvg from "../../../assets/authLogo2.jpg"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ClientApi} from "../../../api/ClientApi";
import {SetApiErrors} from "../../../helpers/SetApiErrors";
import {useUserContext} from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import secureLocalStorage from "react-secure-storage";
function Login() {
    const {register,handleSubmit,formState:{errors,isSubmitting,isValid},setError} = useForm()
    const { setUser,token} = useUserContext()
    const [redirect, setRedirect] = useState(null)
    const location = useLocation();
    const redirectRoute = location.state?.redirectRoute
    const navigate = useNavigate()
    const userType = secureLocalStorage.getItem('userType')
    useEffect(() => {
        if (token){
            if (userType === 'client'){
                navigate("/client/profile")
            }else navigate("/")
        }
        if (redirectRoute){
            setRedirect(redirectRoute)
        }
    }, [token,redirectRoute,redirect,userType]);


    const handlleLogin = async (data) => {
        await ClientApi.login(data).then((data) => {
            if (data.data.status){
                secureLocalStorage.setItem('token',data.data.token)
                secureLocalStorage.setItem('userType','client')
                setUser(data.data.clientData)
                redirect ? navigate(redirect.toString()) : navigate("/client/profile")
                toast.success('Welcome Back')
            }else{
                SetApiErrors(data.data.errors,setError)
            }
        }).catch((e) => console.log(e))
    }
    return (
        <>
            <div className="flex h-screen mb-8">
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <div className="max-w-md text-center">
                        <img src={authSvg} className={"object-fill"} style={{height:'37rem'}} alt={"logo"}/>
                    </div>
                </div>
                <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
                    <div className="max-w-md w-full p-6">
                        <h1 className="text-3xl font-semibold mb-6 text-center" style={{color:'#2A886E'}}>Sign In</h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Welcome Back !</h1>
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input {...register('email',{required:true})}
                                    type="text" placeholder={"email"}
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                <small className={"text-red-500"}>{errors.email && errors.email.message}</small>
                            </div>
                            <div>
                                <label htmlFor="email"
                                       className="block text-sm font-medium text-gray-700">Password</label>
                                <input {...register('password',{required:true})}
                                       type="password" placeholder={"password"}
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                <small className={"text-red-500"}>{errors.password && errors.password.message}</small>

                            </div>
                            <div>
                                <button type="submit" disabled={!isValid || isSubmitting}
                                    style={{backgroundColor: isSubmitting || !isValid ? 'grey':'#2A886E'}}  onClick={handleSubmit(handlleLogin)}
                                        className="w-full text-white p-2 rounded-md hover:bg-gray-800 ">Sign
                                    In
                                </button>
                            </div>
                        </form>
                        <div className="mt-4 text-sm text-gray-600 text-center">
                            <p>You Don't  have an account? <Link to={"/signup"} className="text-black hover:underline">Register Here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;