import React, {useEffect, useState} from 'react';
import {
    Button, Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    Input,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {PencilIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {useAdminContext} from "../../../contexts/AdminContext";
import {useQueryClient} from "react-query";
import PharmacyModal from "../../../components/admincomponents/pharmacy/PharmacyModal";
import {AdminApi} from "../../../api/AdminApi";


const ITEMS_PER_PAGE = 8
function Fourniseurs() {
    const {pharmacy:pharmacyes} = useAdminContext()
    const [searchQuery, setSearchQuery] = useState('');
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const [formContext, setFormContext] = useState({isUpdate:false,data:{}})
    const [currentPage, setCurrentPage] = useState(0)
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const filtredPharmacy = pharmacyes.filter((pharmacy) =>
        pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pharmacy.contact.toLowerCase().includes(searchQuery.toLowerCase())

    );
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPageData = filtredPharmacy.slice(startIndex, endIndex);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);
    const queryClient = useQueryClient()
    const deleteCallBack = async (id) => {
        const confirmation = window.confirm("Are you sure to delete this pharmacy")
        if (confirmation){
            await AdminApi.deletePharmacy(id)
            await queryClient.invalidateQueries("pharmacy")
        }
    };

    return (
        <div>
            <Card className="h-full w-auto">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="my-2 mx-2 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Pharmacy List
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input color={"green"} onChange={(e) => setSearchQuery(e.currentTarget.value)}
                                       label="Search"
                                       icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                />
                            </div>
                            <Button onClick={() => {
                                setFormContext({isUpdate: false,data: {}})
                                handleOpen()
                            }} color={"green"} className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Pharmacy
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    Name
                                </Typography>
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    Contact
                                </Typography>
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    Percentage
                                </Typography>
                            </th>
                            <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">

                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentPageData.map(
                            (pharmacy, index) => {
                                const isLast = index === pharmacy.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Typography>
                                                {pharmacy?.name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography>
                                                {pharmacy?.contact}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography>
                                                {pharmacy?.percentage}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit Fourniseur">
                                                <IconButton onClick={() => {
                                                    setFormContext({isUpdate: true, data: pharmacy})
                                                    handleOpen()
                                                }} color={"orange"} variant="text">
                                                    <PencilIcon className="h-4 w-4"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Delete Fourniseur">
                                                <IconButton onClick={() => deleteCallBack(pharmacy.id)}
                                                            color={"red"} variant="text">
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
                        {currentPageData?.length === 0 && (
                            <td align={"center"} colSpan={7} className={"pt-4"}>No Pharmacy</td>
                        )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {currentPage} of {Math.ceil(pharmacyes.length / ITEMS_PER_PAGE)}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" disabled={currentPage === 1} onClick={handlePreviousPage}>
                            Previous
                        </Button>
                        <Button
                            variant="outlined"
                            size="sm"
                            disabled={currentPage === Math.ceil(pharmacyes.length / ITEMS_PER_PAGE)}
                            onClick={handleNextPage}
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <PharmacyModal open={open} handleOpen={handleOpen} formContext={formContext} />
        </div>
    );
}

export default Fourniseurs;