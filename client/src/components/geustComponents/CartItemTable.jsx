import React from 'react';
import {Chip, Typography} from "@material-tailwind/react";
import {useStoreContext} from "../../contexts/StoreContext";
import {useShopingCart} from "../../contexts/ShopingCartContext";

function CartItemTable({item}) {
    const {products} = useStoreContext()
    const {getItemQty , increaseCartQty , decreaseCartQty ,
        removeItemFromCart } = useShopingCart()
    const product = products.filter((pd) => pd.id === item.id)
    return (
        <tr className={""} >
            <td style={{width: '20%',paddingBottom:'2rem'}}>
                <img src={product[0]?.image} alt="/" className="object-fill h-40 w-auto"/>
            </td>
            <td style={{width: '20%',paddingBottom:'2rem'}}>
                <Typography variant="body1" color="textPrimary">
                    <Chip value="Category" color="green" className="w-20" size="sm"/>
                </Typography>
                <Typography variant="h6" color="brown">
                    {product[0]?.name}
                </Typography>

                <Typography variant="body1" color="green" className=" mt-2">
                    {product[0]?.prix_vendre} DH
                </Typography>
            </td>

            <td style={{width: '20%',paddingBottom:'2rem'}}>

                    <div className="ml-[3.3rem]">
                        <button onClick={() => decreaseCartQty(product[0]?.id)}
                                className="bg-green-500 text-white rounded-l-lg px-2 py-1">-
                        </button>
                        <span className="mx-2 text-black">{getItemQty(product[0]?.id)}</span>
                        <button onClick={() => increaseCartQty(product[0]?.id)}
                                className="bg-green-500 text-white rounded-r-lg px-2 py-1">+
                        </button>
                        <button onClick={() => removeItemFromCart(product[0]?.id)}
                                className="bg-red-500 text-white rounded px-2 py-1 ml-1">x
                        </button>
                    </div>

            </td>
            {/*<td style={{width: '10%'}}>*/}
            {/*    <Chip value="- 4%" color="orange" className="w-12 h-12 rounded-full"/>*/}
            {/*</td>*/}
            <td style={{width: '20%', paddingBottom: '2rem'}}>
                <div>
                    <Typography variant="h3" className="text-blue-500">{(product[0]?.prix_vendre * item.qty).toFixed(2)} DH</Typography>
                    <Typography className="line-through opacity-30">55234.43 DH</Typography>
                </div>
            </td>
        </tr>

    );
}

export default CartItemTable;