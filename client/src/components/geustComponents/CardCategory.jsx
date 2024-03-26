import {Chip} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

function CardCategory({category}) {
    const navigate = useNavigate()
    return (
        <>
            <article
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto hover:border-2 hover:border-black ">
                <img src={category.image}
                     alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 transform hover:-scale-150"/>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{category.name} </h3>
                <div className="z-10 gap-y-1 mt-2 overflow-hidden text-sm leading-6 text-gray-300">
                    <Chip onClick={() => navigate("/store",{state:{searchWithCate:category}})} value={"Show Products"} color={"green"} className={"w-36 cursor-pointer"}/>
                </div>
            </article>
        </>
    );
}

export default CardCategory;