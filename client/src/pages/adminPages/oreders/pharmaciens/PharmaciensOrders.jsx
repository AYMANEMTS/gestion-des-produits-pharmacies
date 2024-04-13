import React, { useState} from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    IconButton,
    MenuList, MenuItem, MenuHandler, Menu, Chip, Select,
} from "@material-tailwind/react";
import {useQuery} from "react-query";
import {AdminApi} from "../../../../api/AdminApi";
import ChangeStatusModal from "../../../../components/admincomponents/orders/ChangeStatusModal";
import OrderDetailModal from "../../../../components/admincomponents/orders/OrderDetailModal";
import UpdateDateModal from "../../../../components/admincomponents/orders/UpdateDateModal";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";

const ITEMS_PER_PAGE = 5
function PharmaciensOrders() {
    const {data: {data}=[]} = useQuery(['orders','pharmacien'],AdminApi.getPharmaciensOrders)
    const [currentPage, setCurrentPage] = useState(1)
    const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const handlePreviousPage = () => setCurrentPage((prevPage) => prevPage - 1);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPageData = data?.slice(startIndex, endIndex);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = currentPageData?.filter((item) =>
        item.client?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Pharmacien Orders List
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full ">
                            <TabsHeader>
                                <Tab value={"all"}>
                                    &nbsp;&nbsp;All&nbsp;&nbsp;
                                </Tab>
                                <Tab value={"P-Online"}>
                                    &nbsp;&nbsp;P-Online&nbsp;&nbsp;
                                </Tab>
                                <Tab value={"COD"}>
                                    &nbsp;&nbsp;COD&nbsp;&nbsp;
                                </Tab>
                            </TabsHeader>
                        </Tabs>
                        <Menu>
                            <MenuHandler>
                                <Button  className={"w-48 bg-green-500"}>Menu</Button>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem onClick={() => setSearchQuery("pending")}>Pending</MenuItem>
                                <MenuItem onClick={() => setSearchQuery("delivered")}>Delivred</MenuItem>
                                <MenuItem onClick={() => setSearchQuery("in progress")}>In Progress</MenuItem>
                            </MenuList>
                        </Menu>
                        <IconButton color={"green"} className={"px-5"} onClick={() => setSearchQuery("")}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-6 h-6">
                                <path fillRule="evenodd"
                                      d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                                      clipRule="evenodd"/>
                            </svg>

                        </IconButton>
                        <div className="w-full md:w-72">
                            <Input onChange={(e) => setSearchQuery(e.currentTarget.value)}
                                   label="Search"
                                   icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    N°
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Pharmacien
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Status
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Total
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData?.length > 0 ? (
                            filteredData?.map(
                                (item, key) => {
                                    const isLast = key === data.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={key}>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    56
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item?.pharmacien?.username}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Chip value={item?.status} className={`${
                                                    item.status === "pending" ? 'bg-gray-600' :
                                                        item.status === "in progress" ? 'bg-orange-500' : 'bg-green-500'
                                                } text-white w-1/2`}/>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {item?.total} DH
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Menu>
                                                    <MenuHandler>
                                                        <IconButton variant="text">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                                 fill="currentColor" className="w-6 h-6">
                                                                <path fillRule="evenodd"
                                                                      d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                                                      clipRule="evenodd"/>
                                                            </svg>
                                                        </IconButton>
                                                    </MenuHandler>
                                                    <MenuList className="flex flex-col gap-2">
                                                        <ChangeStatusModal type={"pharmacien"} data={item} />
                                                        <UpdateDateModal data={item} type={"pharmacien"} />
                                                        <OrderDetailModal type={"pharmacien"} data={item} />
                                                    </MenuList>
                                                </Menu>
                                            </td>
                                        </tr>
                                    );
                                },
                            )
                        ): (
                            <tr>
                                <td colSpan={5} align={"center"}>No Orders</td>
                            </tr>
                        )}

                        </tbody>
                    </table>
                </CardBody>
                {currentPageData?.length > 0 && (
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                            Page {currentPage} of {Math.ceil(data?.length / ITEMS_PER_PAGE)}
                        </Typography>
                        <div className="flex gap-2">
                            <Button variant="outlined" size="sm" disabled={currentPage === 1} onClick={handlePreviousPage}>
                                Previous
                            </Button>
                            <Button
                                variant="outlined"
                                size="sm"
                                disabled={currentPage === Math.ceil(data?.length / ITEMS_PER_PAGE)}
                                onClick={handleNextPage}
                            >
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </>
    );
}

export default PharmaciensOrders;