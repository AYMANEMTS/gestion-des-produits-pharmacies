import { Spinner } from "@material-tailwind/react";

export function CustomSpinner() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <Spinner className="h-16 w-16 text-white" />
        </div>
    );
}
