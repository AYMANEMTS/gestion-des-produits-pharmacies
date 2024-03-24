import authSvg from "../../../assets/authLogo2.jpg"
import {Link} from "react-router-dom";
function Signup() {
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
                        <h1 className="text-3xl font-semibold mb-6 text-center" style={{color:'#2A886E'}}>Sign Up</h1>
                        <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community with
                            all time access and free </h1>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="username"
                                       className="block text-sm font-medium text-gray-700">Username</label>
                                <input type="text" id="username" name="username"
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" id="email" name="email"
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">CNN</label>
                                <input type="text" id="email" name="email"
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="text" id="email" name="email"
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" id="password" name="password"
                                       className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                            </div>
                            <div>
                                <button type="submit" style={{backgroundColor:'#2A886E'}}
                                        className="w-full text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign
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