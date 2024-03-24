import { IconButton} from "@material-tailwind/react";
import {useFavoriteContext} from "../../contexts/FavoriteContext";
import {useNavigate} from "react-router-dom";

function FavoriteItemCart({closeDrawer}) {
    const {favoriteItems,toogleFavorite} = useFavoriteContext()
    const navigate = useNavigate()
    return (
        <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 mx-2 ">
                {favoriteItems.map((item,key) => (
                    <div key={key} className="flex bg-white shadow-md rounded-md overflow-hidden">
                        <img src={item.product.image} alt={"image"} className="w-24 h-full object-cover"/>
                        <div className="p-4 flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{item.product.name}</h2>
                                <p className="text-lg text-gray-800">{item.product.prix_vendre}</p>
                                <div className={"flex mt-2"}>
                                    <div className={"mr-1"}>
                                        <IconButton onClick={() => {
                                            closeDrawer()
                                            navigate(`/store/${item.product.id}`)
                                        }}
                                            size={"sm"} variant="text" className={"bg-green-500 text-white hover:bg-green-800"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                            </svg>

                                        </IconButton>
                                    </div>
                                    <div>
                                        <IconButton onClick={() => toogleFavorite(item.product)}
                                            size={"sm"} variant={"text"} className={"bg-red-400 text-white hover:bg-red-800"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                            </svg>

                                        </IconButton>
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

export default FavoriteItemCart;
