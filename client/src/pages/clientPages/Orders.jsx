import React, {useState} from 'react';
import ClientNav from "../../components/clientComponents/ClientNav";
import {Card, Chip, Typography} from "@material-tailwind/react";
import {useQuery} from "react-query";
import {ClientApi} from "../../api/ClientApi";
import {DateFormat} from "../../helpers/DateFormat";
import {Link} from "react-router-dom";

function Orders() {
    const TABLE_HEAD = ["Order N°","Date", "Total", "Status", ""];
    const [orderData, setOrderData] = useState([])

    const {data:x} = useQuery('orders',ClientApi.getClientorders,{
        retry: 1,refetchOnMount:true,refetchInterval:false,
        onSuccess: (({data}) => {
            if (data?.status){
                setOrderData(data?.data)
            }
        })
    })
    return (
        <>
            <ClientNav />
            <div className={"my-5"}>
                <Card className="h-full w-full overflow-scroll">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {orderData.map((item, index) => {
                            const isLast = index === orderData.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            3
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {DateFormat(item?.created_at)}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item?.total} DH
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            <Chip value={item?.status} color={"green"} className={"w-20"}/>
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Link to={`/client/order/${item?.id}`} >
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                View Order
                                            </Typography>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </Card>
            </div>
        </>
    );
}

export default Orders;
