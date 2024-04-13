import React from 'react';

function SuccessRegisterComponent({handleOpen,resetForm}) {
    return (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
            <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
                <div className="w-full">
                    <div className="m-8 my-20 max-w-[400px] mx-auto">
                        <div className="mb-8">
                            <h1 className="mb-4 text-3xl font-extrabold">Your account has been created successfully.</h1>
                            <p className="text-gray-600">
                                 However, it requires verification by an admin before you can log in. You will receive another email once your account is verified. Thank you for your patience.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <button onClick={() => {
                                handleOpen()
                                resetForm()
                            }}
                                className="p-3 bg-green-500 hover:bg-green-800 border rounded-full w-full font-semibold">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessRegisterComponent;