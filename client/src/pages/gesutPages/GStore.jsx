import FillterProduct from "../../components/geustComponents/FillterProduct";
import {Select,Option} from "@material-tailwind/react";
import CardProduct from "../../components/geustComponents/CardProduct";
import {Pagination} from "../../components/geustComponents/Pagination";

function GStore() {
    const products = [{name:'nnnn'},{name:'nnnn'},{name:'nnnn'},{name:'nnnn'},{name:'nnnn'},{name:'nnnn'},]
    return (
        <div className={"flex mb-6 gap-16"}>
            <div className={"w-1/4"}>
                <FillterProduct />
            </div>
            <div className={"w-3/4 "}>
                <div className={"flex justify-end"}>
                    <div className={"mt-2 mr-2 text-green-500 font-bold"}>
                        TRIER PAR :
                    </div>
                    <div>
                        <Select label="PERTINENCE" success>
                            <Option>Material Tailwind HTML</Option>
                            <Option>Material Tailwind React</Option>
                            <Option>Material Tailwind Vue</Option>
                            <Option>Material Tailwind Angular</Option>
                            <Option>Material Tailwind Svelte</Option>
                        </Select>
                    </div>
                </div>
                <div className={"grid grid-cols-3 gap-3 mt-3"}>
                    {products.map((pd) => (
                        <div><CardProduct /></div>
                    ))}
                </div>
                <div className={"flex justify-end  mt-6"}>
                    <Pagination/>
                </div>

            </div>
        </div>
    );
}

export default GStore;