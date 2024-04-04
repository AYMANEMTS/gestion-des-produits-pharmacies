import React from 'react';
import {ShowImageFromServer} from "../../helpers/ShowImageFromServer";
import {useStoreContext} from "../../contexts/StoreContext";

function CheckoutProduct({item,product}) {
    const {calculDiscount} = useStoreContext()
    return (
        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                 // src={ShowImageFromServer(product?.image)}
                 src={product?.image}
                 alt=""/>
            <div className="flex w-full flex-col px-4 pt-2">
                <span className="font-semibold">{product?.name}</span>
                {product && product.promotion ?(
                    <div className={"flex justify-between"}>
                        <div className={"line-through opacity-30 text-black"}>{product?.prix_vendre} DH</div>
                        <div className={"text-md font-bold text-blue-gray "}>{calculDiscount(product?.promotion?.pourcentage,product?.prix_vendre)} DH</div>
                    </div>
                ):<span>{product?.prix_vendre} DH</span>}
                <span>Quantity {item.qty}</span>
                <p className="text-lg font-bold">Total: {product && product.promotion ? (calculDiscount(product?.promotion?.pourcentage,product?.prix_vendre) * item.qty).toFixed(2):
                product?.prix_vendre * item.qty} DH</p>
            </div>
        </div>
    );
}

export default CheckoutProduct;
