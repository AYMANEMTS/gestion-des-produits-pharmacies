import React from 'react';

function PersonalDetails({register,errors}) {
    console.log(errors)
    return (
        <>
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <h3 className="text-xl font-bold text-[#333]">01</h3>
                    <h3 className="text-xl font-bold text-[#333]">Personal Details</h3>
                </div>
                <div className="md:col-span-2">
                    <form>
                        <div className="grid gap-5">
                            <input type="text" placeholder="Full name" {...register('fullName',{
                                required:{
                                    value:true,
                                    message: "This field is required"
                                }
                            })} className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none col-span-full"/>
                            <div className={"text-red-500 pt-0"}>{errors.fullName && errors.fullName.message}</div>
                            <div className={"grid grid-cols-2 gap-5"}>
                                <div>
                                    <input type="email" placeholder="Email address" {...register('email', {
                                        required: {
                                            value: true,
                                            message: "This field is required"
                                        }
                                    })}
                                           className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"/>
                                    <span className={"text-red-500 pt-0"}>{errors.email && errors.email.message}</span>
                                </div>
                                <div>
                                    <input type="text" placeholder="Phone number" {...register('phone', {
                                        required: {
                                            value: true,
                                            message: "this field is required"
                                        }
                                    })}
                                           className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"/>
                                    <span className={"text-red-500 pt-0"}>{errors.phone && errors.phone.message}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </>
    );
}

export default PersonalDetails;