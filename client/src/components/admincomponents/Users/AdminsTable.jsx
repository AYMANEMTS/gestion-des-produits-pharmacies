import React from 'react';
import {
    Avatar,CardBody, Chip, IconButton,Tooltip,
    Typography
} from "@material-tailwind/react";
import {PencilIcon} from "@heroicons/react/24/solid";

function AdminsTable({data,handleOpen,setFormContext,handleDeleteUser}) {
    return (
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <Typography variant="small" color="blue-gray"
                                        className="font-normal leading-none opacity-70">
                                Username
                            </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <Typography variant="small" color="blue-gray"
                                        className="font-normal leading-none opacity-70">
                                Email
                            </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <Typography variant="small" color="blue-gray"
                                        className="font-normal leading-none opacity-70">
                                Role
                            </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                            <Typography variant="small" color="blue-gray"
                                        className="font-normal leading-none opacity-70">
                                Phone
                            </Typography>
                        </th>
                        <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">

                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.map(
                        (user, index) => {
                            const isLast = index === user.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal">
                                                {user?.username}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user?.email}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-70"
                                            >
                                                {user?.user_type}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {user?.phone}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Edit">
                                            <IconButton onClick={() => {
                                                setFormContext({formType:"editAdmin",formData:user})
                                                handleOpen()
                                            }}
                                                color={"orange"} variant="text">
                                                <PencilIcon className="h-4 w-4"/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Detail">
                                            <IconButton onClick={() => {
                                                setFormContext({formType:"readAdmin",formData:user})
                                                handleOpen()
                                            }}
                                                variant="text" color={"green"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     fill="currentColor" className="w-6 h-6">
                                                    <path
                                                        d="M11.625 16.5a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75Z"/>
                                                    <path fillRule="evenodd"
                                                          d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm6 16.5c.66 0 1.277-.19 1.797-.518l1.048 1.048a.75.75 0 0 0 1.06-1.06l-1.047-1.048A3.375 3.375 0 1 0 11.625 18Z"
                                                          clipRule="evenodd"/>
                                                    <path
                                                        d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z"/>
                                                </svg>

                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Delete">
                                            <IconButton variant="text" color={"red"}
                                                        onClick={() => handleDeleteUser(user.id,user.user_type)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd"
                                                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        },
                    )}
                    {data?.length === 0 && (
                        <td align={"center"} colSpan={7} className={"pt-4"}>No Admins</td>
                    )}
                    </tbody>
                </table>
            </CardBody>
    );
}

export default AdminsTable;