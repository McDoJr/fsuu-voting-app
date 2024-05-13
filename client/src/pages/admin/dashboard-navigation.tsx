import {FaSignOutAlt} from "react-icons/fa";

interface DashboardNavigationProp {
    page: string
}

const DashboardNavigation = ({ page }: DashboardNavigationProp) => {

    const getColor = (id: string) => {
        return id === page ? 'text-white' : 'text-gray-400';
    }

    return (
        <div className="h-full bg-dark-blue flex flex-col items-center py-10 px-12 text-white font-poppins">
            <img src={require('@assets/admin-logo.png')} alt="Admin Logo"
                 className="w-20"/>
            <h1 className="text-2xl mt-2">Admin</h1>
            <p className="text-[12px] text-gray-400">admin@gmail.com</p>

            <ul className="mt-12 text-gray-400">
                <li className={`mb-3 font-[500] ${getColor('dashboard')}`}><a href="">Dashboard</a></li>
                <li className={`mb-3 font-[500] ${getColor('reports')}`}><a href="">Reports</a></li>
                <li className={`mb-3 font-[500] ${getColor('results')}`}><a href="">Show All Results</a></li>
            </ul>

            <button className="w-full py-1.5 self-start flex justify-center items-center cursor-pointer border border-gray-400 mt-auto"><FaSignOutAlt className="mr-2"/>Sign Out</button>
        </div>
    )
}
export default DashboardNavigation;
