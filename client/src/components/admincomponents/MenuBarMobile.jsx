import {Link} from "react-router-dom";
import logo from "../../assets/logo.png"


export default function MenuBarMobile({ setter }) {
    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-green-500 flex [&>*]:my-auto px-2 ">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd"
                          d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                          clipRule="evenodd"/>
                </svg>

            </button>
            <Link to={"/"} className="mx-auto">
                <img
                    src={logo}
                    className={"bg-white rounded"}
                    alt="Company Logo"
                    width={80}
                    height={80}
                />
            </Link>
            <Link
                className="text-3xl flex text-white"
                to={"/"}
            >

            </Link>
        </nav>
    )
}
