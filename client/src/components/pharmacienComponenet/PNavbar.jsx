import React from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse, Badge,
} from "@material-tailwind/react";
import logo from "../../assets/logo.png"
import {Link, useLocation} from "react-router-dom";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useFavoriteContext} from "../../contexts/FavoriteContext";
import {useUserContext} from "../../contexts/AuthContext";
export function PNavbar({content,openFavoriteDrawer,openShopingDrawer}) {
    const [openNav, setOpenNav] = React.useState(false);
    const {cartItems} = useShopingCart()
    const {favoriteItems} = useFavoriteContext()
    const {logout} = useUserContext()
    const {pathname} = useLocation()
    console.log(pathname)
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
        return () => {
            window.removeEventListener("resize", () =>
                window.innerWidth >= 960 && setOpenNav(false)
            );
        };
    }, []);
    const activeRoute = (route) => {
        return route === pathname
    }
    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography as="li" variant="small" color="blue-gray" className={`p-1 font-normal rounded hover:bg-green-500  hover:text-white ${activeRoute('/pharmacien/home') && 'bg-green-500 text-white'} `}>
                <Link to={"/pharmacien/home"} className="flex items-center">
                    Home
                </Link>
            </Typography>
            <Typography as="li" variant="small" color="blue-gray" className={`p-1 font-normal rounded hover:bg-green-500  hover:text-white ${activeRoute('/pharmacien/store') && 'bg-green-500 text-white'} `}>
                <Link to={"/pharmacien/store"} className="flex items-center">
                    Store
                </Link>
            </Typography>
            <Typography as="li" variant="small" color="blue-gray" className={`p-1 font-normal rounded hover:bg-green-500  hover:text-white ${activeRoute('/') && 'bg-green-500 text-white'} `}>
                <Link to={""} className="flex items-center">
                    Orders
                </Link>
            </Typography>

        </ul>
    );

    return (
        <div className="overflow-x-hidden">
            <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        <img src={logo} alt={"logo"} className={"h-8"}/>
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-3">
                            <Badge content={`${cartItems.length > 0 ? cartItems.length : ''}`} className={"bg-green-500"} withBorder>
                                <IconButton onClick={openShopingDrawer}
                                    size={"sm"} variant={"text"}
                                    className={`bg-green-500 text-white hover:bg-green-800 mr-1`}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 576 512" fill={"white"} height={"20"}>
                                        <path
                                            d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                                    </svg>
                                </IconButton>
                            </Badge>
                            <Badge content={`${favoriteItems.length > 0 ? favoriteItems.length : ''}`} className={"bg-red-500"} withBorder>
                                <IconButton onClick={openFavoriteDrawer}
                                    size={"sm"} variant={"text"}
                                    className={`bg-red-400 text-white hover:bg-red-800 `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                         className="w-6 h-6">
                                        <path
                                            d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                    </svg>
                                </IconButton>
                            </Badge>
                            <IconButton onClick={() => logout()}
                                        size={"sm"} variant={"text"}
                                        className={`bg-gray-700 text-white hover:bg-gray-800`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"
                                className={"w-6 h-6"}>
                                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                                </svg>
                            </IconButton>
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <Collapse open={openNav} >
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button fullWidth variant="text" size="sm" className="">
                            <span>Log In</span>
                        </Button>
                        <Button fullWidth variant="gradient" size="sm" className="">
                            <span>Sign in</span>
                        </Button>
                    </div>
                </Collapse>
            </Navbar>
            <div className="px-28 py-12 bg-gray-200  ">
                {content}
            </div>
        </div>
    );
}
