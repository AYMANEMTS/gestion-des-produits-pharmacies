import CardProduct from "./CardProduct";
import {useStoreContext} from "../../contexts/StoreContext";
import {Link} from "react-router-dom";

function PopulaireProduct() {

    const  {products} = useStoreContext()
    return (
        <>
            <div className={"flex justify-between mt-4"}>
                <div className={"text-2xl text-green-500 font-sans font-medium my-3"}>Populaire Products</div>
                <Link to={"/store"} className={" flex text-xl font-sans text-green-500 font-medium my-3 "}>Show more products
                    <svg className={"pl-2"} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512" height={"28"} fill={"#57DC69"}>
                        <path
                            d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z"/>
                    </svg>
                </Link>
            </div>
            <div className={"grid grid-cols-4 gap-5"}>
                {
                    products?.slice(0, 8).map((product) => (
                        <div key={product.id}>
                            <CardProduct product={product} />
                        </div>
                    ))
                }

            </div>

        </>
    );
}

export default PopulaireProduct;