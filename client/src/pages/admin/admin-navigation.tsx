import {FaSignOutAlt} from "react-icons/fa";
import {authData} from "../../hooks/auth-hooks.ts";
import {Link, useNavigate} from "react-router-dom";

interface DashboardNavigationProp {
    page: string
}

const AdminNavigation = ({ page }: DashboardNavigationProp) => {

    const navigate = useNavigate();
    const getColor = (id: string) => {
        return id === page ? 'text-white' : 'text-gray-400';
    }


    return (
        <>
            <div className={`h-full w-[230px] bg-dark-blue flex flex-col items-center py-10 px-12 text-white font-poppins`}></div>
            <div
                className={`h-full w-[230px] bg-dark-blue flex flex-col items-center py-10 px-12 text-white font-poppins fixed`}>
                <img src={require('@assets/admin-logo.png')} alt="Admin Logo"
                     className="w-20"/>
                <h1 className="text-2xl mt-2">Admin</h1>
                <p className="text-[12px] text-gray-400">admin@gmail.com</p>

                <ul className="mt-12 text-gray-400">
                    <li className={`mb-3 font-[500] ${getColor('dashboard')}`}><Link
                        to="/admin/dashboard">Dashboard</Link></li>
                    {/*<li className={`mb-3 font-[500] ${getColor('reports')}`}><Link to="">Reports</Link></li>*/}
                    <li className={`mb-3 font-[500] ${getColor('registration')}`}><Link to="/admin/registration">Registration</Link></li>
                    <li className={`mb-3 font-[500] ${getColor('results')}`}><Link to="/admin/results">Results</Link>
                    </li>
                </ul>

                <button
                    className="w-full py-1.5 self-start flex justify-center items-center cursor-pointer border border-gray-400 mt-auto"
                    onClick={() => {
                        authData().removeAccount();
                        navigate("/");
                    }}><FaSignOutAlt className="mr-2"/>Sign Out
                </button>
            </div>
        </>
    )
}
export default AdminNavigation;
