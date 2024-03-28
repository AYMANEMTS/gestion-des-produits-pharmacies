import React, {useEffect, useState} from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip, Menu, MenuItem , MenuHandler , MenuList
} from "@material-tailwind/react";
import {useStoreContext} from "../../contexts/StoreContext";
import {ProductDialog} from "../../components/admincomponents/products/ProductDialog";
import {useAdminContext} from "../../contexts/AdminContext";
import {AdminApi} from "../../api/AdminApi";
import toast from "react-hot-toast";
import {ShowImageFromServer} from "../../helpers/ShowImageFromServer";

function Products() {
    const TABLE_HEAD = ["Product", "Fourniseur", "Category","Promo" ,"Qty" ,"Prix Vendre",""];
    const {products} = useStoreContext()
    const {categories,paginationData,setPaginationData} = useAdminContext()
    const [productFiltred, setProductFiltred] = useState(products)
    const [readOnly, setReadOnly] = useState(false)
    const orderProductBy = (filter) => {
        switch (filter) {
            case "AtoZ":
                const asc = [...productFiltred].sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
                setProductFiltred(asc)
                break
            case "ZtoA":
                const desc = [...productFiltred].sort((a, b) => {
                    return b.name.localeCompare(a.name)
                })
                setProductFiltred(desc)
                break
            case "maxPrice":
                const maxPrice = [...productFiltred].sort((a, b) => {
                    return b.prix_vendre - a.prix_vendre;
                });
                setProductFiltred(maxPrice)
                break
            case "minPrice":
                const minPrice = [...productFiltred].sort((a, b) => {
                    return a.prix_vendre - b.prix_vendre;
                });
                setProductFiltred(minPrice)
                break
            case "all":
                setProductFiltred(products)
                break
            default:
                setProductFiltred(products)
        }
    }
    const filterWithName = (name) => {
        const filtered = products.filter((pd) => pd.name.toLowerCase().includes(name.toLowerCase()));
        setProductFiltred(filtered);
    };
    const [open, setOpen] = React.useState(false);
    const [formContext, setFormContext] = useState({formType:null,productData:{}})
    useEffect(() => {
        setProductFiltred(products)
    }, [products]);
    const handleOpen = () => setOpen(!open);
    const deleteCallBack = async (id) => {
        const confirmation = window.confirm("Are you sure to delete this products")
        if (confirmation){
            const res = await AdminApi.destroyProduct(id).catch((e) => console.log(e))
            if (res.data.status){
                toast.success(res.data.message)
            }
        }
    }
    return (
        <>
            <Card className="">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="black">
                                Products List
                            </Typography>

                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button onClick={() => {
                                setFormContext({formType: 'create',productData: []})
                                setReadOnly(false)
                                handleOpen()
                            }}
                                className="flex items-center gap-3 bg-green-500 hover:bg-green-800" size="sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-6 h-6">
                                    <path fillRule="evenodd"
                                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                          clipRule="evenodd"/>
                                </svg>
                                Add Product
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full">
                            <TabsHeader>
                                <Tab value={"All"} onClick={() => orderProductBy('all')}>
                                    All
                                </Tab
                                >
                                <Tab value={"AtoZ"} onClick={() => orderProductBy('AtoZ')}>
                                 A à Z
                                </Tab>
                                <Tab value={"ZtoA"} onClick={() => orderProductBy('ZtoA')}>
                                    Z à A
                                </Tab>
                                <Tab value={"maxPrice"} onClick={() => orderProductBy('maxPrice')}>
                                    Max Price
                                </Tab>
                                <Tab value={"minPrice"} onClick={() => orderProductBy('minPrice')}>
                                    Min Price
                                </Tab>
                            </TabsHeader>
                        </Tabs>
                        <Menu>
                            <MenuHandler>
                                <Button className={"bg-green-500 hover:bg-green-800 pl-2 pr-9"}>Categories</Button>
                            </MenuHandler>
                            <MenuList className="max-h-72">
                                {categories.filter((cate) => cate.produits.length > 1).map((category,key) => (
                                    <MenuItem onClick={() => setProductFiltred(category.produits)}
                                        key={key}>{category.name}</MenuItem>
                                ))}

                            </MenuList>
                        </Menu>
                        <div className="w-full md:w-72">
                            <Input onChange={(e) => filterWithName(e.currentTarget.value)}
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {productFiltred?.map(
                            (product, index) => {
                                const isLast = index === product.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={ShowImageFromServer(product?.image)} alt={product?.name} size="sm" />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {product?.name}
                                                    </Typography>

                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    sss
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {product?.category?.name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={`${product?.promotion ? product?.promotion?.pourcentage+"%" : ''} `}
                                                    color={"green" }
                                                />
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {product?.qty}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {product?.prix_vendre} DH
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip  content="Edit">
                                                <IconButton color={"orange"} onClick={() => {
                                                    setFormContext({formType: 'update',productData: product})
                                                    setReadOnly(false)
                                                    handleOpen()
                                                }} variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip  content="Detail" >
                                                <IconButton onClick={() => {
                                                    setReadOnly(true)
                                                    handleOpen()
                                                    setFormContext({productData: product})
                                                }}
                                                    variant="text" color={"green"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                         fill="currentColor" className="w-6 h-6">
                                                        <path
                                                            d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z"/>
                                                        <path fillRule="evenodd"
                                                              d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z"
                                                              clipRule="evenodd"/>
                                                        <path
                                                            d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z"/>
                                                    </svg>

                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Delete">
                                                <IconButton variant="text" color={"red"} onClick={() => deleteCallBack(product.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                         fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd"
                                                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {paginationData.page} of {paginationData.totalPages}
                    </Typography>
                    <div className="flex gap-2">
                    <Button disabled={paginationData.page === 1} onClick={() => {
                        setPaginationData({page: paginationData.page - 1})
                        window.scrollTo(0,0)
                    }} variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button disabled={paginationData.page === paginationData.totalPages} onClick={() => {
                            setPaginationData({page: paginationData.page + 1})
                            window.scrollTo(0,0)
                        }} variant="outlined" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <ProductDialog open={open} handleOpen={handleOpen} formContext={formContext} readOnly={readOnly} />
        </>
    );
}

export default Products;


