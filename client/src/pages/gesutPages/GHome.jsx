import homeImage from "../../assets/homeImage2.jpg"
import PopulaireProduct from "../../components/geustComponents/PopulaireProduct";
import RelatedCategorySlider from "../../components/geustComponents/RelatedCategorySlider";
import Brands from "../../components/geustComponents/Brands";
import {useStoreContext} from "../../contexts/StoreContext";
import AlertCustomCloseIcon from "../../components/AlertCustomCloseIcon";
function GHome() {
    const {products} = useStoreContext()
    return (
        <>
            <div className=" justify-center items-center">
                <img className="object-fill rounded  w-full h-60 " alt={""} src={homeImage}/>
            </div>
            {products && products.length > 0 ? (
                <>
                    <div className={"mx-5 lg:block"}>
                        <PopulaireProduct/>
                    </div>
                    <div className={"flex justify-center text-2xl text-green-500 font-semibold my-8"}>Best Categories
                    </div>
                    <RelatedCategorySlider/>
                    <Brands/>
                </>
            ): <AlertCustomCloseIcon defaultOpen={true} /> }

        </>
    );
}

export default GHome;