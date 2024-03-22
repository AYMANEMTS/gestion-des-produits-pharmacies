import SideBar from "../../components/clientComponents/SideBar";

function Profile() {
    return (
        <>
            <div className={"flex gap-3"}>
                <div className={"w-1/4"}>
                    <SideBar />
                </div>
                <div className={"w-3/4 ml-16 mb-8"}>
                    <div className="flex items-center justify-start ">
                         <div className=" w-full max-w-[550px] bg-white">
                            <form>
                                <div className="mb-5">
                                    <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Username
                                    </label>
                                    <input type="text" name="name" id="name" placeholder="Username"
                                           className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Email Address
                                    </label>
                                    <input type="email" name="email" id="email" placeholder="Enter your email"
                                           className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                </div>
                                <div className="-mx-3 flex flex-wrap">
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="date"
                                                   className="mb-3 block text-base font-medium text-[#07074D]">
                                                Phone
                                            </label>
                                            <input type="number" name="date" id="date" placeholder={"Phone"}
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                        </div>
                                    </div>
                                    <div className="w-full px-3 sm:w-1/2">
                                        <div className="mb-5">
                                            <label htmlFor="time"
                                                   className="mb-3 block text-base font-medium text-[#07074D]">
                                                CNN
                                            </label>
                                            <input type="text" name="time" id="time" placeholder={"CNN"}
                                                   className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5 pt-3">
                                    <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                        Address Details
                                    </label>
                                    <textarea rows={3} cols={60} placeholder={"Address Details"}
                                        className={"rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"}>

                                    </textarea>
                                </div>

                                <div>
                                    <button
                                        className="hover:shadow-form w-full rounded-md bg-green-500 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
