import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader, Chip,
    IconButton,
    Input,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import {AdminApi} from "../../../api/AdminApi";
import PharmaciensRequestModal from "../../../components/admincomponents/requests/PharmaciensRequestModal";

function PharmacienRequests() {
    const [pharmaciens, setPharmaciens] = useState([])
    const [modalStatus, setModalStatus] = useState(false)
    const [selectedPharmacien, setSelectedPharmacien] = useState({})
    useEffect(() => {
        try {
            async function getPharmaciens(){
                const res = await AdminApi.getUsers()
                if (res?.data?.status){
                    setPharmaciens(res?.data?.pharmaciens)
                }
            }
            getPharmaciens().catch(e => console.error(e))
        }catch (e) {
            console.error(e)
        }
    }, []);
    return (
        <div>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Pharmaciens Requests
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    User Name
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Phone
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Email
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    CNN
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Pharmacy
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">

                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">

                            </th>

                        </tr>
                        </thead>
                        <tbody>
                        {pharmaciens.map(
                            (user, key) => {
                                const isLast = key === pharmaciens.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={key}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user?.username}
                                            </Typography>
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
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user?.email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user?.CNN}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user?.pharmacy?.name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Chip value={"Not Verified"} color={"red"} />
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Detail">
                                                <IconButton variant="text" color={"green"}
                                                            onClick={() => {
                                                                setModalStatus(true)
                                                                setSelectedPharmacien(user)
                                                            }}>
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
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                    <IconButton variant="outlined" size="sm">
                            1
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            2
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            3
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            ...
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            8
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            9
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            10
                        </IconButton>
                    </div>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </CardFooter>
            </Card>
            <PharmaciensRequestModal open={modalStatus} handleOpen={() => setModalStatus(!modalStatus)} pharmacien={selectedPharmacien}/>
        </div>
    );
}

export default PharmacienRequests;