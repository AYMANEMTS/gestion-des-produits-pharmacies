import React from 'react';
import {Input} from "@material-tailwind/react";
import {useAdminContext} from "../../../contexts/AdminContext";

function ProductsForm({register,formContext,errors,readOnly}) {
    const {categories,fourniseurs} = useAdminContext()
    return (
        <>
            <div className={'grid grid-cols-3 gap-4 '}>
                <div>
                    {readOnly && <p>Name</p>}
                    <Input disabled={readOnly} label={"Nom"} type={"text"} {...register('name')} />
                    <p className={"text-sm text-red-500"}>{errors.name && errors.name.message}</p>
                </div>
                <div className={"col-span-2"}>
                    {readOnly && <p>Description</p>}
                    <Input disabled={readOnly} label={"Description"} type={"text"} {...register("description")}/>
                    <p className={"text-sm text-red-500"}>{errors.description && errors.description.message}</p>
                </div>
                <div>
                    {readOnly && <p>Prix d'achat</p>}
                    <Input disabled={readOnly} label={"Prix d'achat"} type={"number"} {...register("prix_achat")}/>
                    <p className={"text-sm text-red-500"}>{errors.prix_achat && errors.prix_achat.message}</p>
                </div>
                <div>
                    {readOnly && <p>Prix de vendre</p>}
                    <Input disabled={readOnly} label={"Prix de vendre"} type={"number"} {...register("prix_vendre")}/>
                    <p className={"text-sm text-red-500"}>{errors.prix_vendre && errors.prix_vendre.message}</p>
                </div>
                <div>
                    {readOnly && <p>Quantity</p>}
                    <Input disabled={readOnly} label={"Quantity"} type={"number"} {...register("qty")}/>
                    <p className={"text-sm text-red-500"}>{errors.qty && errors.qty.message}</p>
                </div>
                <div>
                    {readOnly?
                        <>
                            {readOnly && <p>Category</p>}
                            <Input type={"text"} disabled={readOnly} defaultValue={formContext.productData?.category?.name}/>
                        </>
                        :(
                        <div className="relative">
                            <select {...register("category_id")} defaultValue={""}
                                    className="block w-full h-10 px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500"
                                    style={{maxHeight: "15rem"}} // Set max height for options
                            >
                                <option value={""} disabled selected>Select Category</option>
                                {categories.map((cate, key) => (
                                    <option key={key}
                                            value={cate.id}>{cate.name} {cate.produits.length > 1 ? `(${cate.produits.length})` : ''}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 13.707a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className={"text-sm text-red-500"}>{errors.category_id && errors.category_id.message}</p>
                        </div>
                    )}
                </div>
                <div>
                    {readOnly?
                        <>
                            {readOnly && <p>Fourniseur</p>}
                            <Input type={"text"} disabled={readOnly} defaultValue={formContext.productData?.fourniseur?.name}/>
                        </>
                        :(
                    <div className="relative">
                        <select {...register("fourniseur_id")} defaultValue={""}
                                className="block w-full h-10 px-4 py-2 pr-8 leading-tight bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:border-gray-500"
                                style={{maxHeight: "15rem"}} // Set max height for options
                        >
                            <option value={""} disabled selected>Select Fourniseur</option>
                            {fourniseurs.map((fourniseur, key) => (
                                <option key={key} value={fourniseur.id}>{fourniseur.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 13.707a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <p className={"text-sm text-red-500"}>{errors.fourniseur_id && errors.fourniseur_id.message}</p>
                    </div>
                    )}
                </div>
                {!readOnly && (
                    <div>
                        <Input label={"Product image"} type={"file"} {...register("image")} onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    document.getElementById("productImage").src = reader.result
                                }
                                reader.readAsDataURL(file);
                            }
                        }}/>
                        <p className={"text-sm text-red-500"}>{errors.image && errors.image.message}</p>
                    </div>
                )}
                <div>
                    {readOnly && <p>Date de fabrication</p>}
                    <Input disabled={readOnly} label={"Date de fabrication"} type={"date"} {...register("date_fab")}/>
                    <p className={"text-sm text-red-500"}>{errors.date_fab && errors.date_fab.message}</p>
                </div>
                <div>
                    {readOnly && <p>Date de expiration</p>}
                    <Input disabled={readOnly} label={"Date de expiration"} type={"date"} {...register("date_exp")}/>
                    <p className={"text-sm text-red-500"}>{errors.date_exp && errors.date_exp.message}</p>
                </div>
                <div>
                    <img
                        src={formContext?.productData?.image ? "http://localhost:8000/storage/products_images/"+formContext.productData.image : ""} id="productImage" alt={""} className={""}/>
                </div>
            </div>
        </>
    );
}

export default ProductsForm;