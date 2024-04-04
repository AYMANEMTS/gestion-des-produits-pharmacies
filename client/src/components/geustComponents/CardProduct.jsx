import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button, Chip, IconButton,
} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useFavoriteContext} from "../../contexts/FavoriteContext";
import {useStoreContext} from "../../contexts/StoreContext";
import {ShowImageFromServer} from "../../helpers/ShowImageFromServer";


function CardProduct({product}) {
    const {increaseCartQty,decreaseCartQty,getItemQty,removeItemFromCart} = useShopingCart()
    const qty = getItemQty(product.id)
    const {toogleFavorite,isFavorit} = useFavoriteContext()
    const {calculDiscount} = useStoreContext()
    return (
        <>
            <Card className="w-auto shadow-xl hover:border-2 hover:border-black">
                <CardHeader shadow={false} floated={false} className="h-48">
                    <img
                        src={product?.image}
                        // src={ShowImageFromServer(product?.image)}
                        alt="card-image"
                        className="h-full w-full object-cover transition-transform duration-300 transform hover:scale-150"
                    />
                    {product?.promotion !== null && (
                        <div className="absolute top-0 right-0 mr-2 mt-4">
                            <Chip value={"-"+product?.promotion?.pourcentage+"%"} color={"orange"} className={"w-8 h-8 p-2 rounded-full"}/>
                        </div>
                    )}
                </CardHeader>
                <CardBody>
                    <div className="mb-2 flex items-center justify-between">
                    <Link to={"/store/"+product.id}>
                            <Typography color="blue-gray" className="font-medium uppercase">
                                {product?.name}
                            </Typography>
                        </Link>
                        <Typography color="blue-gray" className="font-medium">
                            <Chip className={""}
                                  value={product?.category?.name ? product.category.name.slice(0, 11):""}
                                  size={"sm"} color={"green"}/>
                        </Typography>
                    </div>
                    <Typography
                        color="blue-gray"
                        className="font-normal mt-5 flex justify-between"
                    >
                        <div>
                            {product.promotion === null ? (
                                <div>{product?.prix_vendre} DH</div>
                            ): (
                                <div>{calculDiscount(product.promotion.pourcentage, product.prix_vendre)} DH</div>
                            )
                            }


                            {product?.promotion !== null && (
                                <div className={" text-sm line-through text-orange-500"}>
                                    {product?.prix_vendre} DH
                                </div>
                            )}
                        </div>
                        <div className={"mt-3 text-green-500"}>
                            <div>En Stock {product?.qty}</div>
                        </div>
                    </Typography>

                </CardBody>
                <CardFooter className="pt-0">
                    {qty === 0 ? (
                    <div className={"flex"}>
                        <Button onClick={() => increaseCartQty(product.id)}
                                fullWidth={true} variant="text" className="flex items-center justify-between mr-1 text-white bg-green-500 hover:bg-green-800">
                            Add To cart
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 576 512" fill={"white"} height={"20"}>
                                <path
                                    d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                            </svg>
                        </Button>
                        <IconButton  onClick={() => toogleFavorite(product)}
                            size={"lg"} variant={"text"} className={`bg-red-400 text-white hover:bg-red-800 ${isFavorit(product.id) ? 'bg-red-800 hover:bg-red-400' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-6 h-6">
                                <path
                                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                            </svg>
                        </IconButton>
                    </div>
                    ) : (
                        <div className="ml-[3.3rem]">
                            <button onClick={() => decreaseCartQty(product.id)}
                                    className="bg-green-500 text-white rounded-l-lg px-2 py-1">-
                            </button>
                            <span className="mx-2 text-gray-600">{qty}</span>
                            <button onClick={() => increaseCartQty(product.id)}
                                className="bg-green-500 text-white rounded-r-lg px-2 py-1">+
                            </button>
                            <button onClick={() => removeItemFromCart(product.id)}
                                className="bg-red-500 rounded text-white px-2 py-1 ml-1">x
                            </button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </>
    )
        ;
}

export default CardProduct;
