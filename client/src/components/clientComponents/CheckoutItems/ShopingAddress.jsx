import React from 'react';

function ShopingAddress({register,errors}) {
    return (
        <>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div>
                    <h3 className="text-xl font-bold text-[#333]">02</h3>
                    <h3 className="text-xl font-bold text-[#333]">Shopping Address</h3>
                </div>
                <div className="md:col-span-2">
                    <form>
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <input type="text" placeholder="Street address" {...register('address', {
                                    required: {
                                        value: true,
                                        message: "This field is required"
                                    }
                                })}
                                       className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"/>
                                <span className={"text-red-500"}>{errors.address && errors.address.message}</span>
                            </div>
                            <div>
                                <input type="text" placeholder="Zip Code" {...register('ZIP', {
                                    required: {
                                        value: true,
                                        message: "This field is required"
                                    }
                                })}
                                       className="px-4 py-3.5 bg-white text-[#333] w-full col-span-1 text-sm border-2 rounded-md focus:border-blue-500 outline-none"/>
                                <span className={"text-red-500"}>{errors.ZIP && errors.ZIP.message}</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ShopingAddress;