import React, {useState} from 'react';
import {
    Button,
    Chip,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    MenuItem, Select,
    Typography
} from "@material-tailwind/react";
import SelectOption from "@material-tailwind/react/components/Select/SelectOption";
import {AdminApi} from "../../../api/AdminApi";
import {useQueryClient} from "react-query";
import toast from "react-hot-toast";

const STATUS = ["in progress","pending","delivered"]
function ChangeStatusModal({data,type}) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open)
    const [selectedStatus, setSelectedStatus] = useState(null)
    const queryclient = useQueryClient()
    const handlRequest = async () => {
        try {
            const id = data.id
            const Data = {type,status:selectedStatus}
            const res = await AdminApi.changeOrderStatus(id,Data).catch((e) => console.log(e))
            if (res.data.status){
                handleOpen()
                await queryclient.invalidateQueries(['orders',type])
                toast.success(res.data.message)
            }else {
                handleOpen()
                toast.error("failed to change status")
            }
        }catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <MenuItem onClick={handleOpen} className="flex items-center   ">
                <Typography>
                    Change Status
                </Typography>
            </MenuItem>
            <Dialog size={"xs"}
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader className={"capitalize"}>Change Status For {type} Order</DialogHeader>
                <DialogBody>
                    <div className="flex items-center space-x-4">
                        <div>
                            <Chip value={data?.status} className={`${
                                data.status === "pending" ? 'bg-blue-500' :
                                    data.status === "in progress" ? 'bg-orange-500' : 'bg-green-500'
                            } text-white`}/>
                        </div>
                        <div>
                            <Typography className="text-gray-600">
                                Change To
                            </Typography>
                        </div>
                        <div>
                            <Select onChange={(e) => setSelectedStatus(e)}
                                label="Select Status" className="bg-white border border-gray-300">
                                {STATUS.filter((st) => st !== data?.status).map((sts, key) => (
                                    <SelectOption
                                        key={key} value={sts} className="text-gray-700">
                                        {sts}
                                    </SelectOption>
                                ))}
                            </Select>
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button disabled={selectedStatus === null} variant="gradient" color="green" onClick={handlRequest}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>

    );
}

export default ChangeStatusModal;