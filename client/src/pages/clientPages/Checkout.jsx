import React, {useEffect} from 'react';
import PersonalDetails from "../../components/clientComponents/CheckoutItems/PersonalDetails";
import ShopingAddress from "../../components/clientComponents/CheckoutItems/ShopingAddress";
import PaymentInfo from "../../components/clientComponents/CheckoutItems/PaymentInfo";
import {useForm} from "react-hook-form";
import {useUserContext} from "../../contexts/AuthContext";
import {useStoreContext} from "../../contexts/StoreContext";
import {useShopingCart} from "../../contexts/ShopingCartContext";
import {useNavigate} from "react-router-dom";
import {ClientApi} from "../../api/ClientApi";
import PaymentSuccess from "../../components/clientComponents/CheckoutItems/PaymentSuccess";
import toast from "react-hot-toast";

function Checkout() {
    const {user} = useUserContext()
    const {register,handleSubmit,formState:{errors,isSubmitting,isValid}} = useForm({defaultValues:{
            fullName: user.name || "",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || ""
        },mode:"onBlur"})
    const {products} = useStoreContext()
    const {getTotalPrice,cartItems,clearShoppingCart} = useShopingCart()
    const navigate = useNavigate()
    useEffect(() => {
        if (cartItems.length < 1){
            navigate("/store")
        }
    }, [cartItems]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);

    const handllOrder = async (data) => {
        const productsWithQty = {};
        cartItems.forEach((item) => {
            productsWithQty[item.id] = item.qty;
        });
        const custtomData = {
            client_id: user.id,
            productsWithQty: productsWithQty,
            userInformation: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone
            },
            shippingAddress: {
                address: data.address,
                ZIP: data.ZIP
            },
            paymentInfo: {
                cardNumber: data.cardNumber,
                EXP: data.EXP,
                CVV: data.CVV
            }
        }
        await ClientApi.storeOrder(custtomData).then(({data}) => {
            if (data.status){
                handleOpen()
            }else{
                toast.error('failed to create order ')
            }

        }).catch(e => console.log(e))
    }

    return (
        <>
            <div className="font-[sans-serif] bg-white p-4 my-7" >
                <div className="max-w-4xl mx-auto bg-[#FFFFFF] p-7 rounded" >
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-green-500 inline-block border-b-4 border-green-500 pb-1">Checkout</h2>
                    </div>
                    <div className="mt-12" >
                        <PersonalDetails errors={errors} register={register}/>
                        <ShopingAddress errors={errors} register={register}/>
                        <PaymentInfo errors={errors} register={register}/>
                        <div className="my-4">
                            <h3 className="text-xl font-bold text-[#333]">Summary</h3>
                            <ul className="text-[#333] mt-6 space-y-4">
                                <li className="flex flex-wrap gap-4 text-sm">Sub total <span
                                    className="ml-auto font-bold">{getTotalPrice(products).toFixed(2)} DH</span></li>
                                <li className="flex flex-wrap gap-4 text-sm">Tax <span
                                    className="ml-auto font-bold">0.00 DH</span></li>
                                <li className="flex flex-wrap gap-4 text-base font-bold border-t pt-4">Total <span
                                    className="ml-auto">{getTotalPrice(products).toFixed(2)} DH</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-4 mt-12">
                        <button disabled={!isValid || isSubmitting} type="button" onClick={handleSubmit(handllOrder)}
                                className={`px-6 py-3.5 w-full text-sm bg-green-500 text-white rounded-md hover:bg-green-800 ${!isValid || isSubmitting ? 'bg-green-200 hover:bg-green-200':''}`}>Pay
                            now
                        </button>
                    </div>
                </div>
            </div>
            <PaymentSuccess open={open} handleOpen={handleOpen} />
        </>
    )
}

export default Checkout;