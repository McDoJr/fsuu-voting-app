import AdminContainer from "../admin-container.tsx";
import {currentDate} from "../../../utils/utils.ts";
import DashboardSummary from "./dashboard-summary.tsx";

const DashboardPage = () => {
    return (
        <AdminContainer page="dashboard">
            <section className="w-full h-full p-8 flex flex-col">
                <div className="flex">
                    <img src={require('@assets/fsuu_logo.png')} alt="" className="w-20"/>
                    <div className="flex flex-col ml-2">
                        <h1 className="text-3xl font-bold tracking-wider">Dashboard</h1>
                        <p className="font-[500]">{currentDate()}</p>
                    </div>
                </div>
                <DashboardSummary type="executive"/>
                <DashboardSummary type="local"/>
            </section>
        </AdminContainer>
    )
}
export default DashboardPage;

