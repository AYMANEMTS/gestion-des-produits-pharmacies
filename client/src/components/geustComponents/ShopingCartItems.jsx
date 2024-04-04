import React from 'react';
import { Chip} from "@material-tailwind/react";
import {useStoreContext} from "../../contexts/StoreContext";
import {useShopingCart} from "../../contexts/ShopingCartContext";

function ShopingCartItems({item}) {
    const {products} = useStoreContext()
    const {getItemQty , increaseCartQty , decreaseCartQty ,
        removeItemFromCart } = useShopingCart()
    const product = products.filter((pd) => pd?.id === item?.id)
    const {calculDiscount} = useStoreContext()
    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img
                src={product[0]?.image}
                alt="product-image" className="w-full rounded-lg sm:w-40"/>
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900 capitalize">{product[0]?.name}</h2>
                    {product[0]?.promotion !== null && (
                        <Chip value={`- ${product[0]?.promotion?.pourcentage}%`} color={"orange"} className={"h-7 w-10 pl-2 rounded-full"}/>
                    )}
                    {product[0]?.promotion === null ? (
                        <p className="mt-1 text-xl text-green-500 font-semibold">{product[0]?.prix_vendre} DH</p>
                    ) : (
                        <>
                            <p className="mt-1 text-xl text-green-500 font-semibold">{calculDiscount(product[0]?.promotion?.pourcentage,product[0]?.prix_vendre)} DH</p>
                            <p className="mt-1 text-xs line-through text-orange-500 font-semibold">{product[0]?.prix_vendre} DH</p>
                        </>
                    )}
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center justify-end border-gray-100">
                        <button onClick={() => decreaseCartQty(product[0]?.id)}
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-green-500 hover:text-blue-50">
                            - </button>
                        <input className="h-8 w-8 border bg-white text-center text-xs outline-none" disabled={true}
                               type="number" value={getItemQty(product[0]?.id)} min="1"/>
                        <button onClick={() => increaseCartQty(product[0]?.id)}
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-green-500 hover:text-blue-50">
                            + </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        {product[0]?.promotion === null ? (
                            <p className="text-sm">{(getItemQty(product[0]?.id) * product[0]?.prix_vendre).toFixed(2)} DH</p>
                        ): (
                            <p className="text-sm">{(getItemQty(product[0]?.id) * calculDiscount(product[0]?.promotion?.pourcentage, product[0]?.prix_vendre)).toFixed(2)} DH</p>
                        )}
                        <svg onClick={() => removeItemFromCart(product[0]?.id)}
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth="1.5" stroke="currentColor"
                             className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShopingCartItems;