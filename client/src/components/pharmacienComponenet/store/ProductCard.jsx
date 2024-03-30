import { Card, CardBody, CardHeader, Chip, IconButton, Typography} from "@material-tailwind/react";
import React from "react";
import {ShowImageFromServer} from "../../../helpers/ShowImageFromServer";
import {useFavoriteContext} from "../../../contexts/FavoriteContext";
import {useShopingCart} from "../../../contexts/ShopingCartContext";

function ProductCard({product}) {
    const {toogleFavorite,isFavorit} = useFavoriteContext()
    const {removeItemFromCart,increaseCartQty,decreaseCartQty,getItemQty} = useShopingCart()
    return (
        <>
            <Card className="w-full max-w-[48rem] max-h-auto flex-row">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-2/5 shrink-0 rounded-r-none"
                >
                    <img
                        src={ShowImageFromServer(product?.image)}
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody className="pt-1 pb-1 pr-0 mr-0">
                    <Typography className="m-0 font-bold">{product?.name}</Typography>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                        <div className="text-left">
                            <div>{(product?.prix_achat)?.toFixed(2)}DH</div>
                        </div>
                        <div className="text-right">
                            <Chip value={"34%"} color={"orange"} className={"rounded-2xl w-11"} />
                        </div>
                    </div>
                    <div className="line-through opacity-30 text-black">3456.65 DH</div>
                    <div className="text-blue-gray">En Stock {product?.qty}</div>
                    <div className="flex">
                        {getItemQty(product.id) > 0 ? (
                            <div className="">
                                <button onClick={() => decreaseCartQty(product.id)}
                                        className="bg-green-500 text-white rounded-l-lg px-2 py-1">-
                                </button>
                                <span className="mx-2 text-gray-600">{getItemQty(product.id)}</span>
                                <button onClick={() => increaseCartQty(product.id)}
                                        className="bg-green-500 text-white rounded-r-lg px-2 py-1">+
                                </button>
                                <button onClick={() => removeItemFromCart(product.id)}
                                        className="bg-red-500 rounded text-white px-2 py-1 ml-1">x
                                </button>
                                <IconButton onClick={() => toogleFavorite(product)}
                                            size={"sm"} variant={"text"}
                                            className={`bg-red-400 text-white ml-1 py-4 hover:bg-red-800 ${isFavorit(product.id) && 'bg-red-800'} `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-7 my-5">
                                        <path
                                            d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                    </svg>
                                </IconButton>
                            </div>
                        ):(
                            <>
                                <IconButton  onClick={() => increaseCartQty(product.id)}
                                    size={"sm"} variant={"text"}
                                    className={`bg-green-500 text-white hover:bg-green-800 mr-1`}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 576 512" fill={"white"} height={"20"}>
                                        <path
                                            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                    </svg>
                                </IconButton>
                                <IconButton onClick={() => toogleFavorite(product)}
                                            size={"sm"} variant={"text"}
                                            className={`bg-red-400 text-white hover:bg-red-800 ${isFavorit(product.id) && 'bg-red-800'} `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-6">
                                        <path
                                            d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                    </svg>
                                </IconButton>
                            </>
                        )}

                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default ProductCard;