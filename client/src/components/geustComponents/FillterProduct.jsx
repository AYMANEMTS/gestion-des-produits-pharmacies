import {Card, List, ListItem, Slider} from "@material-tailwind/react";
import React from "react";

function FillterProduct() {
    return (
        <>
            <div className={"flex justify-between"}>
                <div className={"font-bold "}>Fillter par</div>
                <div className={"mr-8"}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512" height={"18"}>
                        <path
                            d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/>
                    </svg>
                </div>
            </div>
            <div style={{borderBottom: '2.5px solid black', width: '260px', marginTop: '2px'}}></div>
            <div>
                <div className={"ml-2 mt-2 text-green-500"}>Categories</div>
                <List>
                    <ListItem>Inbox</ListItem>
                    <ListItem>Trash</ListItem>
                    <ListItem>Settings</ListItem>
                </List>
                <div className={"ml-2  text-green-500"}>Prices</div>
                <div className="w-60 ml-4 mt-3">
                    <div className={"flex justify-between"}>
                        <div>124.45</div>
                        <div>124.45</div>
                    </div>
                    <Slider defaultValue={50} color={"green"}/>
                </div>
            </div>


        </>
    );
}

export default FillterProduct;