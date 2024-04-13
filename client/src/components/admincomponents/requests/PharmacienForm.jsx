import {Input} from "@material-tailwind/react";

function PharmacienForm({pharmacien}) {
    return (
        <div className={"grid grid-cols-2 gap-4"}>
            <div>
                <p>UserName</p>
                <Input type={"text"} disabled defaultValue={pharmacien?.username} />
            </div>
            <div>
                <p>FullName</p>
                <Input type={"text"} defaultValue={pharmacien?.name}/>
            </div>
            <div>
                <p>Email</p>
                <Input type={"email"} defaultValue={pharmacien?.email}/>
            </div>
            <div>
                <p>Phone</p>
                <Input type={"number"} defaultValue={pharmacien?.phone}/>
            </div>
            <div className={"col-span-2"}>
                <p>Address</p>
                <Input type={"text"} defaultValue={pharmacien?.address}/>
            </div>

        </div>
    );
}

export default PharmacienForm;