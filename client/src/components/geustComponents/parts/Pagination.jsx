import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination({activePage,totalPages,onPageChange}) {

    const next = () => {
        if (activePage === totalPages) return;

        onPageChange(activePage + 1);
    };

    const prev = () => {
        if (activePage === 1) return;

        onPageChange(activePage - 1);
    };

    const getButtonProps = (page) =>
        ({
            variant: activePage === page ? "filled" : "text",
            color: "green",
            onClick: () => onPageChange(page),
            className: "rounded-full",
        });

    const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
        <IconButton key={index} {...getButtonProps(index + 1)}>
            {index + 1}
        </IconButton>
    ));
    return (
        <div className="flex items-center gap-1">
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={prev}
                disabled={activePage === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/> Previous
            </Button>
            <div className="flex items-center gap-2">
                {paginationButtons}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={next}
                disabled={activePage === totalPages}
            >
                Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
            </Button>
        </div>
    );
}