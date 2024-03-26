import logo from "../../assets/logo.png"
import {Typography} from "@material-tailwind/react";
function Brands() {
    return (
        <div className="container mx-auto my-12">
            <Typography variant={"h3"} color={"green"} className={"flex justify-center "}>Our Brands</Typography>
            <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                    <div className="flex flex-wrap items-center p4 justify-center">
                        <a
                            href="javascript:void(0)"
                            className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]"
                        >
                            <img
                                src={logo}
                                alt="image"
                                className="h-10 w-full"
                            />
                        </a>
                        <a
                            href="javascript:void(0)"
                            className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]"
                        >
                            <img
                                src={logo}
                                alt="image"
                                className="h-10 w-full"
                            />
                        </a>
                        <a
                            href="javascript:void(0)"
                            className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]"
                        >
                            <img
                                src={logo}
                                alt="image"
                                className="h-10 w-full"
                            />
                        </a>
                        <a
                            href="javascript:void(0)"
                            className="mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]"
                        >
                            <img
                                src={logo}
                                alt="image"
                                className="h-10 w-full"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Brands;