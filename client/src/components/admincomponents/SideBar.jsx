import React, {useState} from 'react';
import logo from "../../assets/logo.png"

import {Link, useNavigate} from "react-router-dom";
import {
    List,
    ListItem,
    Accordion,
    AccordionHeader,
    AccordionBody,
    ListItemPrefix,
    Typography, ListItemSuffix, Chip
} from "@material-tailwind/react";
import {
    ChevronRightIcon,
    Cog6ToothIcon, PowerIcon,
    UserCircleIcon
} from "@heroicons/react/16/solid";
import {useUserContext} from "../../contexts/AuthContext";

function SideBar({setter,show}) {
    const className = "bg-green-500 w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";
    const {logout} = useUserContext()
    const navigate = useNavigate()
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30`}
            onClick={() => {
                setter(oldVal => !oldVal);
            }}
        />
    )
    const [open, setOpen] = useState(0)
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    return (
        <>
            <div className={`${className}${appendClass} py-7`}>
                <div className="p-2 flex">
                    <Link to={"/"}>
                        {/*eslint-disable-next-line*/}
                        <img src={logo} className={"bg-white rounded"} alt="Company Logo" width={300} height={300} />
                    </Link>
                </div>
                <div className="flex flex-col py-4">
                    <List className={"text-white"}>
                        <Link to={"/admin/home"}>
                            <ListItem >
                                <ListItemPrefix>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                         viewBox="0 0 512 512" className={"h-5 w-5"}>
                                        <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z"/>
                                    </svg>
                                </ListItemPrefix>
                                Dashboard
                            </ListItem>
                        </Link>
                        <Accordion open={open === 1}>
                            <ListItem className="p-0" selected={open === 1}>
                                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 text-white">
                                <ListItemPrefix>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-6 h-6">
                                            <path
                                                d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"/>
                                        </svg>
                                    </ListItemPrefix>
                                    <Typography color="white" className="mr-auto font-normal">
                                        Manage
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1 text-white">
                                <List className="p-0 text-white">
                                    <Link to={"/admin/products"}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Products
                                        </ListItem>
                                    </Link>
                                    <Link to={"/admin/users"}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Users
                                        </ListItem>
                                    </Link>
                                    <Link to={"/admin/category"}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Category
                                        </ListItem>
                                    </Link>
                                    <Link to={"/admin/fourniseurs"}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Fourniseurs
                                        </ListItem>
                                    </Link>
                                    <Link to={"/admin/pharmacy"}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Pharmacy
                                        </ListItem>
                                    </Link>
                                    <Link to={"/admin/promotion"}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                            </ListItemPrefix>
                                            Prmotion
                                        </ListItem>
                                    </Link>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 2}>
                            <ListItem className="p-0" selected={open === 2}>
                                <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 text-white">
                                    <ListItemPrefix>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-6 h-6">
                                            <path fillRule="evenodd"
                                                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                                                  clipRule="evenodd"/>
                                            <path fillRule="evenodd"
                                                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </ListItemPrefix>
                                    <Typography color="white" className="mr-auto font-normal">
                                        Orders
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1 text-white">
                                <List className="p-0 text-white">
                                    <Link to={"/admin/orders/clients"}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5"/>
                                            </ListItemPrefix>
                                            Orders Clients
                                        </ListItem>
                                    </Link>
                                    <Link to={"/admin/orders/pharmaciens"}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5"/>
                                            </ListItemPrefix>
                                            Orders Pharmaciens
                                        </ListItem>
                                    </Link>
                                </List>
                            </AccordionBody>
                        </Accordion>
                        <Accordion open={open === 3}>
                            <ListItem className="p-0" selected={open === 3}>
                                <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3 text-white">
                                    <ListItemPrefix>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={"h-6 w-6"} fill={"currentColor"}
                                             viewBox="0 0 512 512">
                                            <path
                                                d="M216 64c-13.3 0-24 10.7-24 24s10.7 24 24 24h16v33.3C119.6 157.2 32 252.4 32 368H480c0-115.6-87.6-210.8-200-222.7V112h16c13.3 0 24-10.7 24-24s-10.7-24-24-24H256 216zM24 400c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"/>
                                        </svg>
                                    </ListItemPrefix>
                                    <Typography color="white" className="mr-auto font-normal">
                                        Requests
                                    </Typography>
                                </AccordionHeader>
                            </ListItem>
                            <AccordionBody className="py-1 text-white">
                                <List className="p-0 text-white">
                                <Link to={"/admin/requests/pharmacien"}>
                                        <ListItem>
                                            <ListItemPrefix>
                                                <ChevronRightIcon strokeWidth={3} className="h-3 w-5"/>
                                            </ListItemPrefix>
                                            Pharmaciens
                                        </ListItem>
                                    </Link>
                                </List>
                            </AccordionBody>
                        </Accordion>
                    <ListItem>
                            {/*<ListItemPrefix>*/}
                            {/*    /!*<InboxIcon className="h-5 w-5" />*!/*/}
                            {/*</ListItemPrefix>*/}
                            Inbox
                            <ListItemSuffix>
                                <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                            </ListItemSuffix>
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Settings
                        </ListItem>
                        <ListItem onClick={() => {
                            logout()
                            navigate("/admin/login")
                        }} >
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}

export default SideBar;

