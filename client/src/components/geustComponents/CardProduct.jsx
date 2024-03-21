import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button, Chip,
} from "@material-tailwind/react";


function CardProduct() {
    return (
        <>
            <Card className="w-auto shadow-2xl">
                <CardHeader shadow={false} floated={false} className="h-48">
                    <img
                        src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute top-0 right-0 mr-2 mt-4">
                        <Chip value={"-2% "} color={"orange"} className={"w-8 h-8 p-2 rounded-full"}/>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="mb-2 flex items-center justify-between">
                        <Typography color="blue-gray" className="font-medium">
                            Apple AirPods
                        </Typography>
                        <Typography color="blue-gray" className="font-medium">
                            <Chip value={"category"} size={"sm"} color={"green"}/>
                        </Typography>
                    </div>
                    <Typography
                        color="blue-gray"
                        className="font-normal mt-5 flex justify-between"
                    >
                        <div>
                            <div>154 DH</div>
                            <div className={"opacity-30 text-sm line-through"}>200 DH</div>
                        </div>
                        <div className={"mt-3 text-green-500"}>
                            <div>En Stock 34</div>
                        </div>
                    </Typography>

                </CardBody>
                <CardFooter className="pt-0">

                    <Button fullWidth={true} variant="" className="flex items-center justify-between bg-green-500">
                        Add To cart
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 576 512" fill={"white"} height={"20"}>
                            <path
                                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                </Button>
            </CardFooter>
        </Card>
</>
)
    ;
}

export default CardProduct;