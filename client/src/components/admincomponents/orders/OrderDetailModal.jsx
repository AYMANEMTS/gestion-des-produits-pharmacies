import React, {useState} from 'react';
import {
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Dialog,
    DialogBody,
    DialogHeader,
    Input,
    MenuItem,
    Typography
} from "@material-tailwind/react";
import {ShowImageFromServer} from "../../../helpers/ShowImageFromServer";

function OrderDetailModal({type,data}) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const userInformation = data?.userInformation && JSON.parse(data.userInformation)
    const shippingAddress = data?.shippingAddress && JSON.parse(data.shippingAddress)
    return (
        <>
            <MenuItem onClick={handleOpen} className="flex items-center   ">
                <Typography>
                    Show Details
                </Typography>
            </MenuItem>
            <Dialog open={open} handler={handleOpen} className={" scroll-auto"}
                    animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0.9, y: -100 },
                    }}>
                <DialogHeader>
                    Order Detail
                </DialogHeader>
                <DialogBody className={"overflow-auto max-h-[80vh]"}>
                    <div className={"grid grid-cols-3 gap-3"}>
                        <div>
                            <p>Order Number</p>
                            <Input type={"text"} disabled defaultValue={"#65"}/>
                        </div>
                        <div>
                            <p>User Username</p>
                            <Input type={"text"} disabled defaultValue={data?.[type]?.username}/>
                        </div>
                        <div>
                            <p>Order Status</p>
                            <Input type={"text"} disabled defaultValue={data?.status}/>
                        </div>
                        <div>
                            <p>Order Total</p>
                            <Input type={"text"} disabled defaultValue={data?.total + " DH"}/>
                        </div>
                        <div>
                            <p>Order Date Livred Prevenu</p>
                            <Input type={"text"} disabled defaultValue={data?.date_livred_prevenu}/>
                        </div>
                        <div>
                            <p>Order Date livred</p>
                            <Input type={"text"} disabled defaultValue={data?.date_livred}/>
                        </div>
                        <div className={"col-span-3 flex justify-center"}><Typography variant={"h5"}>User
                            Information</Typography></div>
                        <div>
                            <p>Full Name</p>
                            <Input type={"text"} disabled defaultValue={userInformation?.fullName}/>
                        </div>
                        <div>
                            <p>Phone</p>
                            <Input type={"text"} disabled defaultValue={userInformation?.phone}/>
                        </div>
                        <div>
                            <p>Email</p>
                            <Input type={"text"} disabled defaultValue={userInformation?.email}/>
                        </div>
                        <div className={"col-span-3 flex justify-center"}><Typography variant={"h5"}>Shipping
                            Address</Typography></div>
                        <div className={"col-span-2"}>
                            <p>Address</p>
                            <Input type={"text"} disabled defaultValue={shippingAddress?.address}/>
                        </div>
                        <div>
                            <p>ZIP</p>
                            <Input type={"text"} disabled defaultValue={shippingAddress?.ZIP}/>
                        </div>
                        <div className={"col-span-3 flex justify-center"}><Typography
                            variant={"h5"}>Products</Typography></div>
                    </div>
                    <CardBody className="overflow-scroll px-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                            <tr>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography variant="small" color="blue-gray"
                                                className="font-normal leading-none opacity-70">
                                        Product
                                    </Typography>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography variant="small" color="blue-gray"
                                                className="font-normal leading-none opacity-70">
                                        Prix Achat
                                    </Typography>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography variant="small" color="blue-gray"
                                                className="font-normal leading-none opacity-70">
                                        Prix vendre
                                    </Typography>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography variant="small" color="blue-gray"
                                                className="font-normal leading-none opacity-70">
                                        Promo
                                    </Typography>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography variant="small" color="blue-gray"
                                                className="font-normal leading-none opacity-70">
                                        Qty
                                    </Typography>
                                </th>
                                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                    <Typography variant="small" color="blue-gray"
                                                className="font-normal leading-none opacity-70">
                                        Total
                                    </Typography>
                                </th>

                            </tr>
                            </thead>
                            <tbody>
                            {data?.produits?.map(
                                (product, key) => {
                                    const isLast = key === data.produits.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={key}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={ShowImageFromServer(product?.image)}
                                                            alt={product?.name} size="sm"/>
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
                                                {product?.prix_achat} DH
                                            </td>
                                            <td className={classes}>
                                                {product?.prix_vendre} DH
                                            </td>
                                            <td className={classes}>
                                                {product?.promotion?.pourcentage}
                                            </td>
                                            <td className={classes}>
                                                {product?.pivot?.qty}
                                            </td>
                                            <td className={classes}>
                                                {product?.pivot?.total} DH
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                            </tbody>
                        </table>
                    </CardBody>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default OrderDetailModal;