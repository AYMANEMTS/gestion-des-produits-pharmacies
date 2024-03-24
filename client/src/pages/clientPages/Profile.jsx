import ClientNav from "../../components/clientComponents/ClientNav";
import {useForm} from "react-hook-form";
import {useUserContext} from "../../contexts/AuthContext";

function Profile() {
    const {user} = useUserContext()
    const {register} = useForm({defaultValues:{
            username: user?.username || "",
            fullName: user?.name || "",
            phone: user?.phone || "",
            email: user?.email || "",
            CNN: user?.CNN || "",
            address: user?.address || ""

        }})
    return (
        <>
            <ClientNav />
            <div className="flex items-center justify-start my-5">
                 <div className=" w-full max-w-auto bg-white p-8 rounded">
                     <form>
                         <div className="-mx-3 flex flex-wrap">
                             <div className="w-full px-3 sm:w-1/2">
                                 <div className="mb-5">
                                     <label
                                            className="mb-3 block text-base font-medium text-[#07074D]">
                                         Username
                                     </label>
                                     <input type="text" placeholder={"Username"} {...register('username')}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                 </div>
                             </div>
                             <div className="w-full px-3 sm:w-1/2">
                                 <div className="mb-5">
                                     <label
                                         className="mb-3 block text-base font-medium text-[#07074D]">
                                         Full Name
                                     </label>
                                     <input type="email" placeholder={"full name"} {...register('fullName')}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                 </div>
                             </div>
                         </div>
                         <div className="-mx-3 flex flex-wrap">
                             <div className="w-full px-3 sm:w-1/2">
                                 <div className="mb-5">
                                     <label
                                            className="mb-3 block text-base font-medium text-[#07074D]">
                                         Phone
                                     </label>
                                     <input type="text" placeholder={"Phone"} {...register('phone')}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                 </div>
                             </div>
                             <div className="w-full px-3 sm:w-1/2">
                                 <div className="mb-5">
                                     <label
                                            className="mb-3 block text-base font-medium text-[#07074D]">
                                         Email
                                     </label>
                                     <input type="text" placeholder={"email"} {...register('email')}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                 </div>
                             </div>
                         </div>

                         <div className="-mx-3 flex flex-wrap">
                             <div className="w-full px-3 sm:w-1/2">
                                 <div className="mb-5">
                                     <label
                                            className="mb-3 block text-base font-medium text-[#07074D]">
                                         Adress
                                     </label>
                                     <input type="text" placeholder={"Phone"} {...register('address')}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                 </div>
                             </div>
                             <div className="w-full px-3 sm:w-1/2">
                                 <div className="mb-5">
                                     <label
                                            className="mb-3 block text-base font-medium text-[#07074D]">
                                         CNN
                                     </label>
                                     <input type="text" placeholder={"CNN"} {...register('CNN')}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"/>
                                 </div>
                             </div>
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
        </>
    );
}

export default Profile;
