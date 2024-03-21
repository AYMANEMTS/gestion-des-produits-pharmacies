import {Chip} from "@material-tailwind/react";

function CardCategory() {
    return (
        <>
            <article
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto ">
                <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
                     alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">Category </h3>
                <div className="z-10 gap-y-1 mt-2 overflow-hidden text-sm leading-6 text-gray-300">
                    <Chip value={"Show Products"} color={"green"} className={"w-36"}/>
                </div>
            </article>
        </>
    );
}

export default CardCategory;