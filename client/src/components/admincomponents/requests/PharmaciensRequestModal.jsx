import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Switch,
    Typography
} from "@material-tailwind/react";
import PharmacienForm from "./PharmacienForm";
import {useEffect, useState} from "react";
import {AdminApi} from "../../../api/AdminApi";
import {axiosClient} from "../../../api/axios";

function PharmaciensRequestModal({open,handleOpen,pharmacien}) {
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (checked){
            setTimeout(async () => {
                const confirmation = window.confirm("Are you sure to change status for this account")
                if (confirmation){
                    const res = await axiosClient.post(`/admin/pharmacien/verified${pharmacien.id}`).catch(e => console.error(e))
                    console.log(res)
                    handleOpen()
                    setChecked(false)
                }else {
                    setChecked(false)
                }
            },500)
        }
    }, [checked, handleOpen, pharmacien.id]);
    return (
        <>
            <Dialog open={open} handler={handleOpen} size={"xl"}>
                <DialogHeader>Pharmacy details.</DialogHeader>
                <DialogBody>
                    <PharmacienForm pharmacien={pharmacien} />
                    <Typography variant={"h5"} className={"py-4"}>
                        Pharmacy
                    </Typography>
                    <div className={"grid grid-cols-2 gap-4"}>
                        <div>
                            <p>Pharmacy Name</p>
                            <Input disabled type={"text"} defaultValue={pharmacien?.pharmacy?.name}/>
                        </div>
                        <div>
                            <p>Contact</p>
                            <Input disabled type={"text"} defaultValue={pharmacien?.pharmacy?.contact}/>
                        </div>
                        <div className={"col-span-2"}>
                            <p>Address</p>
                            <Input disabled type={"text"} defaultValue={pharmacien?.pharmacy?.address}/>
                        </div>
                        <div className={"col-span-2"}>
                            <Switch onChange={() => setChecked(!checked)} checked={checked}
                                color={"green"} label={checked ? 'Verified' : 'Not Verified'} />
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default PharmaciensRequestModal;