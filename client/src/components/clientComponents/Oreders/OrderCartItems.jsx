import React from "react";
import {useStoreContext} from "../../../contexts/StoreContext";

function OrderCartItems({product}) {
    const {calculDiscount} = useStoreContext()
    return (
        <div
            className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
            <div className="pb-4 md:pb-8 w-full md:w-40">
                <img className="w-full hidden md:block"
                     src={product?.image} alt="dress"/>
                <img className="w-full  md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                     alt="dress"/>
            </div>
            <div
                className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                    <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 capitalize text-gray-800">
                        {product?.name}
                    </h3>
                    <div className="flex justify-start items-start flex-col space-y-1">
                        {product?.promotion && (
                            <p className="text-sm dark:text-white leading-none text-gray-800"><span
                                className="dark:text-gray-400 text-gray-800">Discount: </span> {product?.promotion?.pourcentage}%
                            </p>
                        )}
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span
                            className="dark:text-gray-400 text-gray-800">Quantity: </span> {product?.pivot?.qty}
                        </p>
                        <p className="text-sm dark:text-white leading-none text-gray-800"><span
                            className="dark:text-gray-400 text-gray-800">Mark: </span> Surgame
                        </p>

                    </div>
                </div>
                <div className="flex justify-between space-x-8 items-start w-full">
                    {product?.promotion ? (
                            <p className="text-base dark:text-white xl:text-lg leading-6">{calculDiscount(product?.promotion?.pourcentage, product?.prix_vendre)}DH
                                <span className="text-red-300 line-through"> {product?.prix_vendre}DH</span></p>
                            ): (
                                <p className="text-base dark:text-white xl:text-lg leading-6 pl-16">{product?.prix_vendre}DH
                                </p>
                            )}

                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{product?.pivot?.total}DH</p>
                </div>
            </div>
        </div>
    );
}

export default OrderCartItems;