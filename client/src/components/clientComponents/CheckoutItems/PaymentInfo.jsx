import React from 'react';

function PaymentInfo({register,errors}) {
    return (
        <>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div>
                    <h3 className="text-xl font-bold text-[#333]">03</h3>
                    <h3 className="text-xl font-bold text-[#333]">Payment method</h3>
                </div>
                <div className="md:col-span-2">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="flex items-center">
                            <input type="radio" className="w-5 h-5 cursor-pointer" id="card" />
                            <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                                <img src="https://readymadeui.com/images/visa.webp" className="w-12"
                                     alt="card1"/>
                                <img src="https://readymadeui.com/images/american-express.webp"
                                     className="w-12" alt="card2"/>
                                <img src="https://readymadeui.com/images/master.webp" className="w-12"
                                     alt="card3"/>
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal"/>
                            <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                                <img src="https://readymadeui.com/images/paypal.webp" className="w-20"
                                     alt="paypalCard"/>
                            </label>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-4 gap-6 mt-6">
                        <div className="col-span-2">
                            <input type="number" placeholder="Card number" {...register('cardNumber',{
                                required:{
                                    value:true,
                                    message: "this field is required"
                                }
                            })}
                                   className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"/>
                            <span className={"text-red-500"}>{errors.cardNumber && errors.cardNumber.message}</span>
                        </div>
                        <div>
                            <input type="number" placeholder="EXP." {...register('EXP', {
                                required: {
                                    value: true,
                                    message: "this field is required"
                                }
                            })}
                                   className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"/>
                            <span className={"text-red-500"}>{errors.EXP && errors.EXP.message}</span>
                        </div>
                        <div>
                            <input type="number" placeholder="CVV" {...register('CVV', {
                                required: {
                                    value: true,
                                    message: "this field is required"
                                }
                            })}
                                   className="px-4 py-3.5 bg-white text-[#333] w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none"/>
                            <span className={"text-red-500"}>{errors.CVV && errors.CVV.message}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentInfo;