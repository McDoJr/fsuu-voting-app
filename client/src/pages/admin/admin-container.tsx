import AdminNavigation from "./admin-navigation.tsx";
import React from "react";

interface AdminContainerProp {
    page: string,
    children: React.ReactNode
}

const AdminContainer = ({ page, children }: AdminContainerProp) => {

    return (
        <section className="w-full h-screen flex justify-between">
            <AdminNavigation page={page}/>
            {children}
        </section>
    )
}

export default AdminContainer;
