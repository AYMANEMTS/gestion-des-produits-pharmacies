import FillterProduct from "../../components/geustComponents/FillterProduct";
import CardProduct from "../../components/geustComponents/CardProduct";
import {useStoreContext} from "../../contexts/StoreContext";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import AlertCustomCloseIcon from "../../components/AlertCustomCloseIcon";
import {Button, CardFooter, Typography} from "@material-tailwind/react";


const ITEMS_PER_PAGE = 10;
function GStore() {
    const {products} = useStoreContext()
    const [productsFiltred, setProductsFiltred] = useState(products)
    const fliterProductsWithCategory = (category) => setProductsFiltred(category.produits)
    const filterWithMinPrice = (min) => {
        const filtred = products.filter((prd) => prd.prix_vendre >= min)
        setProductsFiltred(filtred)
    }
    const filterWithMaxPrice = (max) => {
        const filtred = products.filter((prd) => prd.prix_vendre <= max)
        setProductsFiltred(filtred)
    }
    const filterAlphabetically = (order) => {
        const sorted = [...productsFiltred].sort((a, b) => {
            if (order === 'asc') {
                return a.name.localeCompare(b.name);
            } else if (order === 'desc') {
                return b.name.localeCompare(a.name);
            }
            return 0;
        });
        setProductsFiltred(sorted);
    }
    const filterByPrice = (order) => {
        const sorted = [...productsFiltred].sort((a, b) => {
            if (order === 'asc') {
                return a.prix_vendre - b.prix_vendre;
            } else if (order === 'desc') {
                return b.prix_vendre - a.prix_vendre;
            }
            return 0;
        });
        setProductsFiltred(sorted);
    }
    const filterWithName = (name) => {
        const filtered = products.filter((pd) => pd.name.toLowerCase().includes(name.toLowerCase()));
        setProductsFiltred(filtered);
    };
    const [currentPage, setCurrentPage] = useState(1)
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPageData = productsFiltred.slice(startIndex,endIndex)
    const location = useLocation();
    const searchWithName = location.state?.searchWithName;
    const searchWithCate = location.state?.searchWithCate;

    useEffect(() => {
        setProductsFiltred(products)
        if (searchWithName){
            filterWithName(searchWithName)
        }
        if (searchWithCate){
            fliterProductsWithCategory(searchWithCate)
        }
    }, [products,searchWithName,searchWithCate,productsFiltred]);
    const resetProduct = () => setProductsFiltred(products)
    return (
        <>
            {products && products.length > 0 ? (
                <div className={"mx-auto my-12"}>
                    <FillterProduct fliterProductsWithCategory={fliterProductsWithCategory} resetProduct={resetProduct}
                                    filterWithMinPrice={filterWithMinPrice} filterWithMaxPrice={filterWithMaxPrice}
                                    filterAlphabetically={filterAlphabetically}
                                    filterByPrice={filterByPrice}
                    />
                    <div
                        className={"grid lg:grid-cols-4 md:grid-cols-3  grid-cols-1 mx-4 lg:mx-0 md:lx-0 sm:mx-4 gap-4"}>
                        {currentPageData?.map((product, key) => (
                            <div key={key}>
                                <CardProduct product={product}/>
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
            ): <AlertCustomCloseIcon defaultOpen={true} /> }
        </>
    );
}

export default GStore;












































































































































































































































































































































































