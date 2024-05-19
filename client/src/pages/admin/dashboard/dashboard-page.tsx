import AdminContainer from "../admin-container.tsx";
import {colors, currentDate, getLogo, setTitle} from "../../../utils/utils.ts";
import DashboardSummary from "./dashboard-summary.tsx";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../utils/context.ts";
import {FaBell, FaCheck} from "react-icons/fa";

const DashboardPage = () => {

    const {updateNominees, voters, history, fetchHistory, fetchVoters, notification, setNotification} = useContext(DataContext);
    const [dropdown, setDropdown] = useState(false);

    const first = ['AP', 'ASP', 'BAP', 'CJEP'];
    const second = ['CSP', 'ETP', 'NP', 'TEP'];

    useEffect(() => {
        setTitle('Dashboard');
        updateNominees();
        fetchHistory();
        fetchVoters();
        fetchVoters();
    }, []);

    const getPercentage = (amount: number, total: number) => {
        return parseInt(((100 * amount) / total).toString());
    }

    const getDepartmentSection = (department: string, index: number) => {

        const total = voters.filter(value => value.department === department).length;
        const voted = history.filter(value => value.department === department).length;

        const percentage = getPercentage(voted, total);

        return (
            <div key={index} className="flex items-center w-[250px] -z-10">
                <img src={getLogo(department) + ""} alt="" className="w-[16px] h-[16px] mr-1.5"/>
                <p className="text-[16px] font-[500]">{department}</p>
                <div className="w-[70%] flex rounded-xl ml-auto bg-gray-200 relative">
                    <p className="text-[12px] text-black ml-[3px] font-[500]">0%</p>
                    <div className={`flex items-center justify-end px-[3px] rounded-xl absolute top-0 left-0 ${percentage ? '' : 'opacity-0'}`}
                         style={{backgroundColor: colors[department.toLowerCase()], width: `${percentage ? percentage : 0}%`}}>
                        <p className="text-[12px] text-gray-100 font-[500]">{percentage ? percentage : 0}%</p>
                    </div>
                </div>
            </div>
        )
    }

    const getNotification = () => {

        const list = history.sort((a , b) => parseInt(b.id + '') - parseInt(a.id + '')).slice(0, 4);

        return (
            <div id="bell" className="w-[180px] flex flex-col py-3 px-4 rounded-lg absolute left-0 top-5 bg-white border z-50 shadow-lg">
                <p id="bell" className="text-md font-[600] mb-2">Recently Voted</p>
                {history.length > 0 && list.map((value, index) => {
                    return <p id="bell" key={index} className="text-sm flex font-[500] items-center"><FaCheck className="mr-3 text-[12px]"/> {value.student_id}</p>
                })}
            </div>
        )
    }

    return (
        <AdminContainer page="dashboard">
            <section className="w-full h-full p-8 flex flex-col relative">
                <div className="flex relative w-[50%]">
                    <img src={require('@assets/fsuu_logo.png')} alt="" className="w-20"/>
                    <div className="flex flex-col ml-2">
                        <h1 className="text-3xl font-bold tracking-wider">Dashboard</h1>
                        <p className="font-[500]">{currentDate()}</p>
                    </div>
                </div>
                <div className="border py-1.5 px-3 ml-auto font-poppins absolute top-8 right-8 select-none">
                    <div className="flex items-center">
                        <h3 className="text-[16px] font-[500] mb-1.5">Overall Progress</h3>
                        <div id="bell" className="relative ml-2 translate-y-[-3px] rounded-[50%] cursor-pointer" onClick={() => {
                            setDropdown(!dropdown);
                            setNotification(0)
                            localStorage.setItem("notification", JSON.stringify(0));
                        }}>
                            <FaBell id="bell" className="text-dark-blue text-[20px]"/>
                            {notification > 0 && <p id="bell"
                                         className="text-[10px] leading-[20px] w-[20px] h-[18px] text-center bg-red-500 text-white rounded-[50%] absolute top-[-5px] right-[-12px]">
                                {notification > 10 ? '10+' : notification}</p>}
                            {dropdown && getNotification()}
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col mr-3">
                        {first.map((department, index) => {
                                return getDepartmentSection(department, index);
                            })}
                        </div>
                        <div className="flex flex-col mr-3">
                            {second.map((department, index) => {
                                return getDepartmentSection(department, index);
                            })}
                        </div>
                    </div>
                </div>
                <DashboardSummary type="executive"/>
                <DashboardSummary type="local"/>
            </section>
        </AdminContainer>
    )
}
export default DashboardPage;

