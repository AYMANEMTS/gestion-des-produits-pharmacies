import React, {useEffect} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Chip, IconButton, Typography} from "@material-tailwind/react";
import RelatedProductSlider from "../../components/geustComponents/RelatedProductSlider";
import {useStoreContext} from "../../contexts/StoreContext";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useFavoriteContext} from "../../contexts/FavoriteContext";

function GSingleProduct() {
    const {id} = useParams()
    const {products} = useStoreContext()
    const navigate = useNavigate()
    const { getItemQty , increaseCartQty , decreaseCartQty} = useShopingCart()
    const {isFavorit,toogleFavorite} = useFavoriteContext()
    useEffect(() => {
        const product = products.find((pd) => pd.id === parseInt(id))
        if(!product){
            navigate("/store")
        }
    }, [products,id]);
    const product = products.filter((pd) => pd.id === parseInt(id))
    return (
        <>
            <section className="relative pt-10 pb-10  bg-blueGray-50">
                <div className="items-center flex flex-wrap">
                    <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                        <img alt="..." className="max-w-full rounded-lg shadow-lg"
                             src={product[0].image}/>
                    </div>
                    <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                        <div className="md:pr-12">
                            <div className={"flex justify-between mt-4"}>
                                <Chip value={"Category "} color={"green"} size={"sm"} className={"w-24 pl-3 mb-3"}/>
                                <Chip value={"-2% "} color={"orange"} className={"w-9 h-9 p-2 rounded-full"}/>
                            </div>
                            <h3 className="text-3xl font-semibold">{product[0].name}</h3>
                            <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                                {product[0].description}
                                {product[0].description}
                            </p>
                            <div style={{borderBottom: '2px solid #A7A7A7', width: 400}} className={"my-4"}></div>
                            <div className={"flex justify-between"}>
                                <div>
                                    <Typography variant={"h3"} color={"green"}>
                                        {product[0].prix_vendre} DH
                                    </Typography>
                                </div>
                                <div className={"opacity-30 text-xl mt-2 line-through"}>200 DH</div>
                            </div>
                            {/*cart buttons */}
                            <div className={"flex justify-between "}>
                                <div className={"my-7"}>
                                    <Typography variant={"h4"} color={"gray"}>
                                        En stock 345
                                    </Typography>
                                </div>
                                <div>
                                    <div className="flex h-10 w-45 mt-7 pl-4 ">
                                        <button disabled={getItemQty(product[0].id) === 0}
                                                onClick={() => decreaseCartQty(product[0].id)}
                                                className={`group rounded-l-full bg-gray-300 px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 ${getItemQty(product[0].id) === 0 ? '' : 'hover:bg-gray-500'}`}>
                                            <svg
                                                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                viewBox="0 0 22 22"
                                                fill="none">
                                                <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                                      strokeLinecap="round"/>
                                                <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                      strokeLinecap="round"/>
                                                <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                      strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                        <input type="text" style={{backgroundColor: 'rgb(229 231 235)'}}
                                               className="border-y border-gray-200 bg-gray-500 text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                                               placeholder={getItemQty(product[0].id)} disabled={true}/>
                                        <button onClick={() => increaseCartQty(product[0].id)}
                                                className="group rounded-r-full px-6 bg-gray-300 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-500">
                                            <svg
                                                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                viewBox="0 0 22 22"
                                                fill="none">
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                                      strokeLinecap="round"/>
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                                      strokeWidth="1.6"
                                                      strokeLinecap="round"/>
                                                <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                                      strokeWidth="1.6"
                                                      strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex justify-center pb-4"}>
                                {getItemQty(product[0].id) > 0 && (
                                    <div className={"flex justify-center ml-14"}>
                                        <h6
                                            className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                                            {(product[0].prix_vendre * getItemQty(product[0].id)).toFixed(2)} DH</h6>
                                    </div>
                                )}
                            </div>
                            {/*cart items*/}
                            <div className={"flex justify-center "}>
                                <div className={""}>
                                    <Link to={"/cart/items"}>
                                        <Button variant={"text"} size={"lg"}
                                            className="flex items-center text-white bg-green-500 hover:bg-green-800 gap-3 w-full">
                                        Go to Cart
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 576 512" fill={"white"} height={"20"} className={"pl-3"}>
                                            <path
                                                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                        </svg>
                                        </Button>
                                    </Link>
                                </div>
                                <div>
                                    <IconButton size={"lg"} onClick={() => toogleFavorite(product[0])}
                                                variant={"text"} className={`bg-red-400 text-white hover:bg-red-800 ${isFavorit(product.id) ? 'bg-red-800 hover:bg-red-400 ml-2 ' : 'ml-2'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-6 h-6">
                                            <path
                                                d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                        </svg>
                                    </IconButton>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={""}>
                    </div>
                </div>
            </section>
            <div className={"flex justify-center my-5 "}>
                <Typography variant={"h3"} color={"green"}>
                    Related product
                </Typography>
            </div>
            <div className={"mx-4"}>
                <RelatedProductSlider/>
            </div>

        </>
    )
        ;
}

export default GSingleProduct;