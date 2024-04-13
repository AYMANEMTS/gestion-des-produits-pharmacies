import FilterBar from "../../components/pharmacienComponenet/store/FilterBar";
import ProductCard from "../../components/pharmacienComponenet/store/ProductCard";
import {useAdminContext} from "../../contexts/AdminContext";
import React, {useState} from "react";
import {Button, CardFooter, Typography} from "@material-tailwind/react";

const ITEMS_PER_PAGE = 10;
function PStore() {
    const {products} = useAdminContext()
    const [currentPage, setCurrentPage] = useState(1)
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const [searchQuery, setSearchQuery] = useState('');
    const filterWithName = (query) => products.filter((pd) => pd.name.toLowerCase().includes(query.toLowerCase()));
    const filtredProducts = filterWithName(searchQuery);
    const currentPageData = filtredProducts.slice(startIndex, endIndex);
    return (
        <div className={"bg-gray-200 "}>
            <FilterBar setSearchQuery={setSearchQuery}/>
            <div className={"grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 my-10 "}>
                {currentPageData?.map((product,key) => (
                    <div key={key}>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </div>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {currentPage} of {Math.ceil(products.length / ITEMS_PER_PAGE)}
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" disabled={currentPage === 1} onClick={handlePreviousPage}>
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === Math.ceil(products.length / ITEMS_PER_PAGE)}
                        onClick={handleNextPage}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
        </div>
    );
}

export default PStore;