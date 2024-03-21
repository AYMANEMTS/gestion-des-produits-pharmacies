import homeImage from "../../assets/homeImage2.jpg"
import PopulaireProduct from "../../components/geustComponents/PopulaireProduct";
import PopulaireCategory from "../../components/geustComponents/PopulaireCategory";
function GHome() {
    return (
        <>
            <div className=" justify-center items-center">
                <img className="object-fill rounded  w-full h-60 " alt={""} src={homeImage}/>
            </div>
            <PopulaireProduct />
            <PopulaireCategory />
        </>
    );
}

export default GHome;