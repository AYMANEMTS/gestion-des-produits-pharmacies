import homeImage from "../../assets/homeImage2.jpg"
import PopulaireProduct from "../../components/geustComponents/PopulaireProduct";
import RelatedCategorySlider from "../../components/geustComponents/RelatedCategorySlider";
import Brands from "../../components/geustComponents/Brands";
function GHome() {
    return (
        <>
            <div className=" justify-center items-center">
                <img className="object-fill rounded  w-full h-60 " alt={""} src={homeImage}/>
            </div>
            <div className={"mx-5 lg:block"}>
                <PopulaireProduct />
            </div>
            <div className={"flex justify-center text-2xl text-green-500 font-semibold my-8"}>Best Categories</div>
            <RelatedCategorySlider />
            <Brands />
        </>
    );
}

export default GHome;