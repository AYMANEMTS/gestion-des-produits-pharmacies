import React, {useState} from 'react';
import {useStoreContext} from "../../../contexts/StoreContext";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip, IconButton,
    Input,
    Menu,
    MenuHandler, MenuItem, MenuList, Option, Select,
    Typography
} from "@material-tailwind/react"
import PromotionModalForm from "../../../components/admincomponents/promotion/PromotionModalForm";

function PromotionCreate() {
    const {products} = useStoreContext()
    const [productsSelectedIds, setProductsSelectedIds] = useState([])
    const [promotionModal, setPromotionModal] = useState(false)
    const handleSelect = (id) => {
        setProductsSelectedIds(prevState => {
            const isSelected = prevState.includes(id);
            if (isSelected) {
                return prevState.filter(selectedId => selectedId !== id);
            } else {
                return [...prevState, id];
            }
        });
    };
    const isSlected = (id) => productsSelectedIds.includes(id)
    return (
        <>
            <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded mb-4">
                <div className="flex items-center flex-wrap justify-start mb-2 lg:justify-center flex-grow">
                    {/* Category Filter */}
                    <div className="mr-4">
                        <Menu>
                            <MenuHandler>
                                <Button variant={"text"}
                                        className={"bg-green-500 hover:bg-green-800 text-white"}>Categories</Button>
                            </MenuHandler>
                            <MenuList className="max-h-72">
                                     <MenuItem>xxxx</MenuItem>
                                     <MenuItem>xxxx</MenuItem>
                                     <MenuItem>xxxx</MenuItem>
                                     <MenuItem>xxxx</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                    {/* Price Filter */}
                    <div className="mr-4">
                        <Menu
                            dismiss={{
                                itemPress: false,
                            }}
                        >
                            <MenuHandler>
                                <Button variant={"text"}
                                        className={"bg-green-500 hover:bg-green-800 text-white"}>Prices</Button>
                            </MenuHandler>
                            <MenuList>
                                <Input
                                    type={"number"}
                                    label={`Min Price : DH`}
                                    containerProps={{
                                        className: "mb-4",
                                    }}
                                />
                                <Input
                                    type={"number"}
                                    label={`Max Price :  DH`}
                                    containerProps={{
                                        className: "mb-4",
                                    }}

                                />
                            </MenuList>
                        </Menu>
                    </div>
                    {/* Brand Filter */}
                    <div className="mr-auto">
                        <Menu>
                            <MenuHandler>
                                <Button variant={"text"}
                                        className={"bg-green-500 hover:bg-green-800 text-white"}>Brands</Button>
                            </MenuHandler>
                            <MenuList className="flex flex-col gap-2">
                                <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
                                    <Avatar
                                        variant="circular"
                                        alt="tania andrew"
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <Typography variant="small" color="gray" className="font-semibold">
                                            Tania send you a message
                                        </Typography>
                                        <Typography
                                            className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                                            <svg
                                                width="16"
                                                height="17"
                                                viewBox="0 0 16 17"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M7.99998 14.9C9.69736 14.9 11.3252 14.2257 12.5255 13.0255C13.7257 11.8252 14.4 10.1974 14.4 8.49998C14.4 6.80259 13.7257 5.17472 12.5255 3.97449C11.3252 2.77426 9.69736 2.09998 7.99998 2.09998C6.30259 2.09998 4.67472 2.77426 3.47449 3.97449C2.27426 5.17472 1.59998 6.80259 1.59998 8.49998C1.59998 10.1974 2.27426 11.8252 3.47449 13.0255C4.67472 14.2257 6.30259 14.9 7.99998 14.9ZM8.79998 5.29998C8.79998 5.0878 8.71569 4.88432 8.56566 4.73429C8.41563 4.58426 8.21215 4.49998 7.99998 4.49998C7.7878 4.49998 7.58432 4.58426 7.43429 4.73429C7.28426 4.88432 7.19998 5.0878 7.19998 5.29998V8.49998C7.20002 8.71213 7.28434 8.91558 7.43438 9.06558L9.69678 11.3288C9.7711 11.4031 9.85934 11.4621 9.95646 11.5023C10.0536 11.5425 10.1577 11.5632 10.2628 11.5632C10.3679 11.5632 10.472 11.5425 10.5691 11.5023C10.6662 11.4621 10.7544 11.4031 10.8288 11.3288C10.9031 11.2544 10.9621 11.1662 11.0023 11.0691C11.0425 10.972 11.0632 10.8679 11.0632 10.7628C11.0632 10.6577 11.0425 10.5536 11.0023 10.4565C10.9621 10.3593 10.9031 10.2711 10.8288 10.1968L8.79998 8.16878V5.29998Z"
                                                    fill="#90A4AE"
                                                />
                                            </svg>
                                            13 minutes ago
                                        </Typography>
                                    </div>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                <div className="flex items-center justify-end flex-grow m-2  lg:flex-initial">
                    {/* Sorting Dropdown */}
                    <div className={" mt-2 mr-2 text-green-500 font-bold"}>
                        TRIER PAR :
                    </div>
                    <div>
                        <Select label="PERTINENCE" success>
                            <Option>De A à Z</Option>
                            <Option>De Z à A</Option>
                            <Option>Prix croissant</Option>
                            <Option>Prix décroissant</Option>
                        </Select>
                    </div>
                </div>
                <IconButton  variant={"text"}
                            className={"bg-green-500 hover:bg-green-800 text-white"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                    </svg>

                </IconButton>
            </div>
            <PromotionModalForm open={promotionModal} handleOpen={() => setPromotionModal(!promotionModal)} selectedProducts={productsSelectedIds} />
            <div className={"flex justify-between py-4"}>
                <div>Select Product and click to next | {productsSelectedIds.length} products selected</div>
                <div>
                    <Button disabled={productsSelectedIds.length < 1} onClick={() => setPromotionModal(!promotionModal)} color={"green"}>
                        Next
                    </Button>
                </div>
            </div>
            <div className={"grid grid-cols-4 gap-4"}>
                {products?.map((product, key) => {
                    return (
                        <Card key={key}
                              className={`w-auto cursor-pointer ${isSlected(product.id) && 'border-4 border-green-500'}`}
                              onClick={() => handleSelect(product.id)}>
                            {isSlected(product.id) && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="green"
                                    className="w-8 h-8 bg-white rounded-full absolute top-8 right-6 z-10"
                                    onClick={() => handleSelect(product.id)}>
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                            <CardHeader shadow={false} floated={false} className="h-48">
                                <img
                                    src={product?.image}
                                    // src={ShowImageFromServer(product?.image)}
                                    alt="card-image"
                                    className="h-full w-full object-cover transition-transform duration-300 transform hover:scale-150"
                                />
                                {product?.promotion !== null && (
                                    <div className="absolute top-0 right-0 mr-2 mt-4">
                                        <Chip value={"-" + product?.promotion?.pourcentage + "%"} color={"orange"}
                                              className={"w-8 h-8 p-2 rounded-full"}/>
                                    </div>
                                )}
                            </CardHeader>
                            <CardBody>
                                <div className="mb-2 flex items-center justify-between">
                                    <Typography color="blue-gray" className="font-medium uppercase">
                                        {product?.name} | {product.id}
                                    </Typography>
                                    <Typography color="blue-gray" className="font-medium">
                                        <Chip className={""}
                                              value={product?.category?.name ? product.category.name.slice(0, 11) : ""}
                                              size={"sm"} color={"green"}/>
                                    </Typography>
                                </div>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
        </>
    );
}

export default PromotionCreate;