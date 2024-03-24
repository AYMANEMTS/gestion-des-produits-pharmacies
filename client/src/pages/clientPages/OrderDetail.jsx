import React, {useEffect, useState} from 'react';
import ClientNav from "../../components/clientComponents/ClientNav";
import {useNavigate, useParams} from "react-router-dom";
import {ClientApi} from "../../api/ClientApi";
import RelatedProductSlider from "../../components/geustComponents/RelatedProductSlider";

function OrderDetail() {
    const {id} = useParams()
    const [orderData, setOrderData] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        try {
            async function getorder(){
                await ClientApi.getOrder(id).then(({request,data}) => {
                    if (request.status !== 200){
                        navigate("/client/orders")
                    }
                    if (data.status){
                        setOrderData(data.data)
                    }
                }).catch(() => navigate("/store"))
            }
            getorder()
        }catch (e){
            navigate("/client/orders")
        }
    }, []);
    console.log(orderData)
    const shippingAddress = JSON.parse(orderData.shippingAddress)
    const paymentInfo = JSON.parse(orderData.paymentInfo)
    const userInformation = JSON.parse(orderData.userInformation)
    return (
        <>
            <ClientNav />
            <div className={""}>
                <div className="mx-auto my-7">
                    <div className={"flex justify-around"}>
                        <div className="">
                            <dl className="mt-12 text-sm font-medium">
                                <dt className="text-gray-900">Tracking number</dt>
                                <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
                            </dl>
                        </div>
                        <div className="">
                            <dl className="mt-12 text-sm font-medium">
                                <dt className="text-gray-900">Order Status</dt>
                                <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
                            </dl>
                        </div>
                        <div className="">
                            <dl className="mt-12 text-sm font-medium">
                                <dt className="text-gray-900">Date</dt>
                                <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
                            </dl>
                        </div>
                        <div className="">
                            <dl className="mt-12 text-sm font-medium">
                                <dt className="text-gray-900">Date Livred</dt>
                                <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
                            </dl>
                        </div>
                    </div>
                    <section aria-labelledby="order-heading" className="mt-10 border-t border-gray-200 flex">
                        <div className={" "}>
                            {orderData?.produits?.map((product) => (
                                <div key={product.id}
                                     className="flex space-x-3 border-b border-gray-200 p-4 bg-white mb-3 rounded">
                                    <img
                                        src={product.image}
                                        alt={"jdj"}
                                        className="h-full w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                                    />
                                    <div className={"pb-4"}>
                                        <div className="flex flex-auto flex-col ">
                                            <div>
                                                <h4 className="font-medium text-gray-900 pt-5 capitalize">
                                                    <a href={""}>{product.name}</a>
                                                </h4>
                                                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                                            </div>
                                            <div className="mt-6 flex flex-1 items-end">
                                                <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                                                    <div className="flex">
                                                        <dt className="font-medium text-gray-900">Quantity</dt>
                                                        <dd className="ml-2 text-gray-700">{product?.pivot?.qty}</dd>
                                                    </div>
                                                    <div className="flex pl-4 sm:pl-6 ">
                                                        <dt className="font-medium text-gray-900">Sub Price</dt>
                                                        <dd className="ml-2 text-gray-700">{product.prix_vendre} DH</dd>
                                                    </div>
                                                    <div className="flex pl-4 sm:pl-6 ">
                                                        <dt className="font-medium text-gray-900">Total Price</dt>
                                                        <dd className="ml-2 text-gray-700">{product.pivot.total} DH</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={"w-5/12 "}>
                            <div className="ml-3 sm:pl-6 bg-white rounded pb-4 pr-4">
                                <h3 className="sr-only">Your information</h3>

                                <h4 className="sr-only">Addresses</h4>
                                <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                                    <div>
                                        <dt className="font-medium text-gray-900">Shipping address</dt>
                                        <dd className="mt-2 text-gray-700">
                                            <address className="not-italic">
                                                <span className="block">Address: {shippingAddress.address}</span>
                                                <span className="block">ZIP: {shippingAddress.ZIP}</span>
                                            </address>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-900">Billing address</dt>
                                        <dd className="mt-2 text-gray-700">
                                            <address className="not-italic">
                                                <span className="block">Kristin Watson</span>
                                                <span className="block">7363 Cynthia Pass</span>
                                                <span className="block">Toronto, ON N3Y 4H8</span>
                                            </address>
                                        </dd>
                                    </div>
                                </dl>

                                <h4 className="sr-only">Payment</h4>
                                <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
                                    <div>
                                        <dt className="font-medium text-gray-900">Payment method</dt>
                                        <dd className="mt-2 text-gray-700">
                                            <p>Apple Pay</p>
                                            <p>Mastercard</p>
                                            <p>
                                                <span aria-hidden="true">••••</span>
                                                <span className="sr-only">Ending in </span>1545
                                            </p>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="font-medium text-gray-900">Shipping method</dt>
                                        <dd className="mt-2 text-gray-700">
                                            <p>DHL</p>
                                            <p>Takes up to 3 working days</p>
                                        </dd>
                                    </div>
                                </dl>

                                <h3 className="sr-only">Summary</h3>

                                <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="font-medium text-gray-900">Subtotal</dt>
                                        <dd className="text-gray-700">{orderData.total} DH</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="font-medium text-gray-900">Shipping</dt>
                                        <dd className="text-gray-700">0.00 DH</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="font-medium text-gray-900">Total</dt>
                                        <dd className="text-gray-900">{orderData.total} DH</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </section>
                </div>
                <div className={"mb-12"}>
                    <RelatedProductSlider />
                </div>

            </div>
        </>
    );
}

export default OrderDetail;


