import React from "react";
import CustomerDashboardBox from "@/Components/CustomerDashboardBox"

const page = () => {
    return (
        <>
            <div className="grid grid-flow-row-dense grid-cols-5 grid-rows-5 place-items-center p-20 gap-3 bg-white h-screen w-screen ">
                <CustomerDashboardBox />
                <main className="col-span-4 row-span-4 w-full h-full  ">
                    MyProfile
                </main>
            </div>
        </>
    );
};

export default page;
