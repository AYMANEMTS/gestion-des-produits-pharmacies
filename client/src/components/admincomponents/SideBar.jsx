import React, {useState} from 'react';
import logo from "../../assets/logo.png"

import {Link, useLocation} from "react-router-dom";
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
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon
} from "@heroicons/react/16/solid";

function SideBar({setter,show}) {
    const {pathname} = useLocation()
    const className = "bg-green-500 w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  

    // Overlay to prevent clicks in background, also serves as our close button
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
                        <Accordion open={open === 2}>
                            <ListItem className="p-0" selected={open === 2}>
                                <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 text-white">
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
                        <ListItem>
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

