import FillterProduct from "../../components/geustComponents/FillterProduct";
import CardProduct from "../../components/geustComponents/CardProduct";
import {useStoreContext} from "../../contexts/StoreContext";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

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
        <div className={"mx-auto my-12"}>
            <FillterProduct fliterProductsWithCategory={fliterProductsWithCategory} resetProduct={resetProduct}
                filterWithMinPrice={filterWithMinPrice} filterWithMaxPrice={filterWithMaxPrice} filterAlphabetically={filterAlphabetically}
                            filterByPrice={filterByPrice}
            />
            <div className={"grid lg:grid-cols-4 md:grid-cols-3  grid-cols-1 mx-4 lg:mx-0 md:lx-0 sm:mx-4 gap-4"}>
                {productsFiltred.map((product, key) => (
                    <div key={key}>
                        <CardProduct product={product}/>
                    </div>
                ))}
            </div>

        </div>

    );
}

export default GStore;












































































































































































































































































































































































