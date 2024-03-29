import React, {useState} from 'react';
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {PencilIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    CardFooter,
    Avatar, Tooltip, IconButton,
} from "@material-tailwind/react";
import {useAdminContext} from "../../../contexts/AdminContext";
import CategoryFormModal from "../../../components/admincomponents/category/CategoryFormModal";
import {ShowImageFromServer} from "../../../helpers/ShowImageFromServer";
import {AdminApi} from "../../../api/AdminApi";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

function Categories() {
    const TABLE_HEAD = ["Image", "Name",""];
    const {categories} = useAdminContext()
    const [currentPage, setCurrentPage] = useState(1)
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const [open, setOpen] = React.useState(false);
    const [formContext, setFormContext] = useState({isUpdate:false,data:{}})
    const [searchQuery, setSearchQuery] = useState('');
    const filterWithName = (name) => categories.filter((pd) => pd.name.toLowerCase().includes(name.toLowerCase()));
    const filteredCategories = filterWithName(searchQuery);
    const currentPageData = filteredCategories.slice(startIndex, endIndex);
    const deleteCallBack = async (id) => {
        try {
            const confirmation = window.confirm("Are you sure to delete this category")
            if (confirmation){
                const res = await AdminApi.deleteCategory(id)
                if (res.data.success) toast.success(res.data.message)
            }
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="my-2 mx-2 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Category List
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
                                setOpen(!open)
                            }} color={"green"} className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Category
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head, key) => (
                                <th
                                    key={key}
                                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {currentPageData.map(
                            (cat, index) => {
                                const isLast = index === categories.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <Avatar src={ShowImageFromServer(cat?.image)} />
                                        </td>
                                        <td className={classes}>
                                            <Typography>
                                                {cat.name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit Category">
                                                <IconButton onClick={() => {
                                                    setFormContext({isUpdate: true,data: cat})
                                                    setOpen(!open)
                                                }} color={"orange"} variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Delete Category">
                                                <IconButton  onClick={() => deleteCallBack(cat.id)}
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
                            <td align={"center"} colSpan={7} className={"pt-4"}>No Categories</td>
                        )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {currentPage} of {Math.ceil(categories.length / ITEMS_PER_PAGE)}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" disabled={currentPage === 1} onClick={handlePreviousPage}>
                            Previous
                        </Button>
                        <Button
                            variant="outlined"
                            size="sm"
                            disabled={currentPage === Math.ceil(categories.length / ITEMS_PER_PAGE)}
                            onClick={handleNextPage}
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
            <CategoryFormModal open={open} setOpen={setOpen} formContext={formContext} />
        </>
    );
}

export default Categories;
