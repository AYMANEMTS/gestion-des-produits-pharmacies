import DefaultUsersTable from "../../components/admincomponents/Users/DefaultUsersTable";
import {useQuery} from "react-query";
import {AdminApi} from "../../api/AdminApi";
import {
    Button,
    Card, CardFooter,
    CardHeader, IconButton,
    Input, Menu,
    MenuHandler,
    MenuItem, MenuList,
    Tab,
    Tabs,
    TabsHeader,
    Typography
} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, { useState} from "react";
import AdminsTable from "../../components/admincomponents/Users/AdminsTable";
import ClientsTable from "../../components/admincomponents/Users/ClientsTable";
import PharmaciensTable from "../../components/admincomponents/Users/PharmaciensTable";
import UserDialoge from "../../components/admincomponents/Users/UserDialoge";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;
function Users() {
    const [filteredData, setFilteredData] = useState([]);
    const [usersData, setUsersData] = useState({
        admins:[],
        clients:[],
        pharmaciens:[]
    });
    const {data }= useQuery('users', AdminApi.getUsers, {
        onSuccess: (data => {
            if (data?.data.status){
                setUsersData({
                    admins: data?.data?.admins,
                    clients: data?.data?.clients,
                    pharmaciens: data?.data?.pharmaciens,
                });
                setFilteredData([...data?.data?.pharmaciens, ...data?.data?.clients, ...data?.data?.admins]);
            }
        })
    });
    const [tableType, setTableType] = useState("all")
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const [formContext, setFormContext] = useState({formType:null,formData:{}})
    const filterWithSearch = (searchText) => {
        const lowerSearchText = searchText?.toLowerCase();
        const filtered = [...usersData.pharmaciens, ...usersData.clients, ...usersData.admins].filter((pd) => (
            pd?.name?.toLowerCase().includes(lowerSearchText) ||
            pd?.username?.toLowerCase().includes(lowerSearchText) ||
            pd?.email?.toLowerCase().includes(lowerSearchText) ||
            pd?.phone?.includes(searchText)
        ));
        setFilteredData(filtered);
    }
    const handleDeleteUser = async (id,type) => {
        const confirmation = window.confirm("Are you sur to delete this user")
        if (confirmation){
            const res = await AdminApi.deleteUser(id,type)
            if (res.data.status){
                toast.success(res.data.message)
            }else{
                toast.error(res.data.message)
            }
        }
    }
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const currentPageData = () => {
        switch (tableType) {
            case "all":
                return filteredData.slice(startIndex, endIndex);
            case "admin":
                return usersData.admins.slice(startIndex, endIndex);
            case "client":
                return usersData.clients.slice(startIndex, endIndex);
            case "pharmacien":
                return usersData.pharmaciens.slice(startIndex,endIndex);
            default:
                break
        }
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };
    const calculPaginatedDataLength = () => {
        switch (tableType) {
            case "all":
                return filteredData?.length
            case "admin":
                return usersData.admins.length
            case "client":
                return usersData.clients.length
            case "pharmacien":
                return usersData.pharmaciens.length
        }
    }
    return (
        <>
            <Card className="">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="black">
                                Users List
                            </Typography>

                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">

                            <Menu
                                animate={{
                                    mount: { y: 0 },
                                    unmount: { y: 25 },
                                }}
                            >
                                <MenuHandler>
                                    <Button
                                        className="flex items-center gap-3 bg-green-500 hover:bg-green-800" size="sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-6 h-6">
                                            <path fillRule="evenodd"
                                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                        Add User
                                    </Button>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem onClick={() => {
                                        setFormContext({formType: 'createClient',formData: {}})
                                        handleOpen()
                                    }}>
                                        Add Client
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        setFormContext({formType: 'createPharmacien',formData: {}})
                                        handleOpen()
                                    }}>
                                        Add Pharmacien
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        setFormContext({formType: 'createAdmin',formData: {}})
                                        handleOpen()
                                    }}>
                                        Add Admin
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full">
                            <TabsHeader>
                                <Tab onClick={() => {
                                    setTableType("all")
                                    setCurrentPage(1)
                                }} value={"all"} >
                                    All
                                </Tab>
                                <Tab onClick={() => {
                                    setTableType("client")
                                    setCurrentPage(1)
                                }}  value={"client"} >
                                    Client
                                </Tab>
                                <Tab onClick={() => {
                                    setTableType("admin")
                                    setCurrentPage(1)
                                }} value={"admin"} >
                                    Admin
                                </Tab>
                                <Tab onClick={() => {
                                    setTableType("pharmacien")
                                    setCurrentPage(1)
                                }} value={"pharmacien"} >
                                    Pharmacien
                                </Tab>
                            </TabsHeader>
                        </Tabs>
                        <IconButton onClick={() => window.location.reload()}
                            color={"green"} className={"px-3"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-6 h-6">
                                <path fillRule="evenodd"
                                      d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                                      clipRule="evenodd"/>
                            </svg>
                        </IconButton>
                        <div className="w-full md:w-72">
                            <Input onChange={(e) => {
                                setTableType("all")
                                filterWithSearch(e.currentTarget.value)
                            }}
                                   label="Search"
                                   icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                            />
                        </div>

                    </div>
                </CardHeader>
                {tableType === "all" && (
                    <DefaultUsersTable setFormContext={setFormContext} handleOpen={handleOpen} data={currentPageData()}
                                       handleDeleteUser={handleDeleteUser}/>
                )}
                {tableType === "admin" && (
                    <AdminsTable setFormContext={setFormContext} handleOpen={handleOpen} data={currentPageData()}
                                 handleDeleteUser={handleDeleteUser}/>
                )}
                {tableType === "client" && (
                    <ClientsTable setFormContext={setFormContext} handleOpen={handleOpen} data={currentPageData()}
                                  handleDeleteUser={handleDeleteUser}/>
                )}
                {tableType === "pharmacien" && (
                    <PharmaciensTable setFormContext={setFormContext} handleOpen={handleOpen} data={currentPageData()}
                                      handleDeleteUser={handleDeleteUser}/>
                )}
            </Card>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page {currentPage} of {Math.ceil(calculPaginatedDataLength() / ITEMS_PER_PAGE)}
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm" disabled={currentPage === 1} onClick={handlePreviousPage}>
                        Previous
                    </Button>
                    <Button
                        variant="outlined"
                        size="sm"
                        disabled={currentPage === Math.ceil(calculPaginatedDataLength() / ITEMS_PER_PAGE)}
                        onClick={handleNextPage}
                    >
                        Next
                    </Button>
                </div>
            </CardFooter>
            <UserDialoge setFormContext={setFormContext} formContext={formContext} open={open} handleOpen={handleOpen} />
        </>
    );
}

export default Users;