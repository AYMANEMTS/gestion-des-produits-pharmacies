import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem, Card, Badge,
} from "@material-tailwind/react";
import {
    ChevronDownIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    Bars4Icon,
    GlobeAmericasIcon,
    NewspaperIcon,
    PhoneIcon,
    RectangleGroupIcon,
    SquaresPlusIcon,
    SunIcon,
    TagIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import {useShopingCart} from "../../contexts/ShopingCartContext";

const navListMenuItems = [
    {
        title: "Products",
        description: "Find the perfect solution for your needs.",
        icon: SquaresPlusIcon,
    },
    {
        title: "About Us",
        description: "Meet and learn about our dedication",
        icon: UserGroupIcon,
    },
    {
        title: "Blog",
        description: "Find the perfect solution for your needs.",
        icon: Bars4Icon,
    },
    {
        title: "Services",
        description: "Learn how we can help you achieve your goals.",
        icon: SunIcon,
    },
    {
        title: "Support",
        description: "Reach out to us for assistance or inquiries",
        icon: GlobeAmericasIcon,
    },
    {
        title: "Contact",
        description: "Find the perfect solution for your needs.",
        icon: PhoneIcon,
    },
    {
        title: "News",
        description: "Read insightful articles, tips, and expert opinions.",
        icon: NewspaperIcon,
    },
    {
        title: "Products",
        description: "Find the perfect solution for your needs.",
        icon: RectangleGroupIcon,
    },
    {
        title: "Special Offers",
        description: "Explore limited-time deals and bundles",
        icon: TagIcon,
    },
];

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const renderItems = navListMenuItems.map(
        ({ icon, title, description }, key) => (
            <React.Fragment key={key}>
                <Link to={"/"}>
                    <MenuItem className="flex items-center gap-3 rounded-lg">
                        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
                            {React.createElement(icon, {
                                strokeWidth: 2,
                                className: "h-6 text-gray-900 w-6",
                            })}
                        </div>
                        <div>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="flex items-center text-sm font-bold"
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="paragraph"
                                className="text-xs !font-medium text-blue-gray-500"
                            >
                                {description}
                            </Typography>
                        </div>
                    </MenuItem>
                </Link>
            </React.Fragment>
        ),
    );

    return (
        <React.Fragment>
            <Menu
                open={isMenuOpen}
                handler={setIsMenuOpen}
                offset={{ mainAxis: 20 }}
                placement="bottom"
                allowHover={true}
            >
                <MenuHandler>
                    <Typography as="div" variant="small" className="font-medium">
                        <ListItem
                            className="flex items-center gap-2 py-2 pr-4 font-medium text-white"
                            selected={isMenuOpen || isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
                        >
                            Categories
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`hidden h-3 w-3 transition-transform lg:block ${
                                    isMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                            <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`block h-3 w-3 transition-transform lg:hidden ${
                                    isMobileMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </ListItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
                    <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
                        {renderItems}
                    </ul>
                </MenuList>
            </Menu>
            <div className="block lg:hidden">
                <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
            </div>
        </React.Fragment>
    );
}

function NavList() {
    return (
        <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 ">
            <NavListMenu />
            <div style={{borderLeft: '1.5px solid white',height:'30px',marginTop:'2px'}}></div>
            <Link to={"/"} className="text-white">
                <ListItem className="flex items-center text-white gap-2 py-2 pr-4">Home</ListItem>
            </Link>
            <Link to={"/store"} className="text-white">
                <ListItem className="flex items-center text-white gap-2 py-2 pr-4">Store</ListItem>
            </Link>
            <ListItem className="flex items-center text-white gap-2 py-2 pr-4">
                Contact Us
            </ListItem>
        </List>
    );
}



export function NavbarWithMegaMenu() {
    const [openNav, setOpenNav] = React.useState(false);
    const {cartItems} = useShopingCart()

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    return (
        <>
            <Navbar style={{backgroundColor: '#108D34', borderRadius: 0}} className=" px-14 py-2 ">
                <div className="flex items-center justify-between text-white">
                    <div className="hidden lg:block">
                        <NavList/>
                    </div>
                    <div className="hidden  lg:flex">
                        <Link to={"/login"}>

                            <button className={"p-2 hover:bg-green-500 rounded mr-2 mt-1"}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 448 512" height={"16"} fill={"white"}>
                                    <path
                                        d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                                </svg>
                            </button>

                        </Link>
                        <Link to={"/cart/items"}>
                            <Badge content={cartItems.length===0?'':cartItems.length}  className={"bg-white text-black "}>
                                <IconButton variant={"text"} className={"hover:bg-green-500"}  >
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 576 512" height={"16"} fill={"white"}>
                                        <path
                                            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                    </svg>
                                </IconButton>
                            </Badge>
                        </Link>
                    </div>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2}/>
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2}/>
                        )}
                    </IconButton>
                </div>
                <Collapse open={openNav}>
                    <NavList/>
                    <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                        <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
                            Log In
                        </Button>
                        <Button variant="gradient" size="sm" fullWidth>
                            Sign In
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
        </>
    );
}