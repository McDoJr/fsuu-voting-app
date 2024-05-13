import DashboardNavigation from "./dashboard-navigation.tsx";
import React from "react";

interface AdminContainerProp {
    page: string,
    children: React.ReactNode
}

const AdminContainer = ({ page, children }: AdminContainerProp) => {

    return (
        <section className="w-full h-screen flex">
            <DashboardNavigation page={page}/>
            {children}
        </section>
    )
}

export default AdminContainer;
