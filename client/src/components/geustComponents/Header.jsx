import logo from "../../assets/logo.png"
export default function Header() {
    return (
        <>
            <div className="bg-white p-4 flex justify-between items-center px-14">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-full h-14 "/>
                </div>

                <div className="relative mx-auto w-8/12">
                    <input  type="text"  placeholder="Search..." style={{backgroundColor:'#108D34',color:'white'}}
                           className=" text-white  rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-[50rem] h-12"/>
                    <button className="absolute right-0 top-0 mt-4 mr-4 focus:outline-none">
                        <svg className="text-white w-6 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-5.2-5.2M9 11a6 6 0 110-12 6 6 0 010 12z"></path>
                        </svg>
                    </button>
                </div>
            </div>

        </>
    );
}