import React from 'react';

function OrderCustomerInformation({customerInfo}) {
    return (
        <div
            className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
            <div
                className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                    <div
                        className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                        <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                                {customerInfo?.userInformation?.fullName}
                            </p>
                            <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                                {customerInfo?.userInformation?.phone}
                            </p>
                        </div>
                    </div>

                    <div
                        className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                        <p className="cursor-pointer text-sm leading-5 ">{customerInfo?.userInformation?.email}</p>
                    </div>
                </div>
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div
                        className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                        <div
                            className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping
                                Address</p>
                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"><span className={"font-bold"}>
                               Address: </span>{customerInfo?.shippingAddress?.address}</p>
                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"><span className={"font-bold"}>
                               ZIP: </span>{customerInfo?.shippingAddress?.ZIP}</p>
                        </div>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default OrderCustomerInformation;