import React from 'react';

function OrderCustomerInformation({orderData}) {
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
                                {orderData?.name}
                            </p>
                            <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                                {orderData?.phone}
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
                        <p className="cursor-pointer text-sm leading-5 ">{orderData?.email}</p>
                    </div>
                </div>
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div
                        className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                        <div
                            className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                            <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping
                                Address</p>
                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"><span
                                className={"font-bold"}>
                               Address: </span>{orderData?.address}</p>
                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                                {orderData?.payment_type === 'online' ? (
                                    <div className="flex items-center">
                                        <span className="font-bold pr-2">Payment type:</span>
                                        <span className="mr-1">Online</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-5 h-5">
                                            <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z"/>
                                            <path fillRule="evenodd"
                                                  d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <span className="font-bold pr-2">Payment type:</span>
                                        <span className="mr-1">Cash</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 576 512" className={"h-5 w-5"}>
                                            <path
                                                d="M0 112.5V422.3c0 18 10.1 35 27 41.3c87 32.5 174 10.3 261-11.9c79.8-20.3 159.6-40.7 239.3-18.9c23 6.3 48.7-9.5 48.7-33.4V89.7c0-18-10.1-35-27-41.3C462 15.9 375 38.1 288 60.3C208.2 80.6 128.4 100.9 48.7 79.1C25.6 72.8 0 88.6 0 112.5zM288 352c-44.2 0-80-43-80-96s35.8-96 80-96s80 43 80 96s-35.8 96-80 96zM64 352c35.3 0 64 28.7 64 64H64V352zm64-208c0 35.3-28.7 64-64 64V144h64zM512 304v64H448c0-35.3 28.7-64 64-64zM448 96h64v64c-35.3 0-64-28.7-64-64z"/>
                                        </svg>
                                    </div>
                                )}
                            </p>
                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600"><span
                                className={"font-bold"}>
                               Expected Delivery Date: </span>
                                <br/>{orderData?.date_livred_prevenu}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderCustomerInformation;