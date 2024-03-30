import React from 'react';
import {ShowImageFromServer} from "../../helpers/ShowImageFromServer";
import {IconButton} from "@material-tailwind/react";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useAdminContext} from "../../contexts/AdminContext";

function ShopingCartitems({closeDrawer,item}) {
    const {products} = useAdminContext()
    const {cartItems,decreaseCartQty,removeItemFromCart,increaseCartQty,getItemQty} = useShopingCart()
    const product = products.filter((pd) => pd.id === item.id)
    return (
        <div className="overflow-y-auto" style={{maxHeight: "500px"}}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 mx-2 ">
                {cartItems.map((item, key) => (
                    <div key={key} className="flex bg-white shadow-md rounded-md overflow-hidden">
                        <img src={ShowImageFromServer(product[0]?.image)} alt={"image"}
                             className="w-24 h-full object-cover"/>
                        <div className="p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{product[0]?.name}</h2>
                                <p className="text-lg text-gray-800">{(product[0]?.prix_achat)?.toFixed(2)} DH</p>
                                <div className={"flex mt-2"}>
                                    <div className="">
                                        <button onClick={() => decreaseCartQty(product[0]?.id)}
                                                className="bg-green-500 text-white rounded-l-lg px-2 py-1">-
                                        </button>
                                        <span className="mx-2 text-gray-600">{getItemQty(product[0]?.id)}</span>
                                        <button onClick={() => increaseCartQty(product[0]?.id)}
                                                className="bg-green-500 text-white rounded-r-lg px-2 py-1">+
                                        </button>
                                        <button onClick={() => removeItemFromCart(product[0]?.id)}
                                                className="bg-red-500 rounded text-white px-2 py-1 ml-1">x
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopingCartitems;