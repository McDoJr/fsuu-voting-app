import {useContext, useEffect} from "react";
import {DataContext} from "../../../utils/context.ts";
import Button from "../../../components/button.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {FaLongArrowAltLeft} from "react-icons/fa";
import UserNavigation from "../user-navigation.tsx";
import {setTitle} from "../../../utils/utils.ts";
import { FaPenToSquare } from "react-icons/fa6";
import { EditProfile } from "./edit-profile.tsx";

const ProfilePage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { getComponent, setVisible } = EditProfile();
    const { user, handleLogout, incomplete } = useContext(DataContext);

    useEffect(() => {
        setTitle('Profile');
    }, []);

    const handleBack = () => {
        if(incomplete) return;
        const {data, link} = location.state;
        navigate(link, {state: {data}});
    }

    const profileImage = user.picture === 'undefined' ? require('@assets/profile.png') : user.picture;

    return (
        <>
            <section className="w-full min-h-screen flex flex-col">
                <UserNavigation link="." data={{}}>
                    <img src={require('@assets/fsuu_logo.png')} alt="" className="w-16 mr-3"/>
                    <h1 className="text-3xl text-white font-[600] tracking-wider">FSUU VOTING SYSTEM</h1>
                </UserNavigation>
                <div className="w-full flex flex-col justify-center items-center my-auto">
                    <div
                        className="flex flex-col items-center py-6 px-20 rounded-lg border-2 border-dark-blue bg-gray-200 font-poppins relative">
                        <FaLongArrowAltLeft className="absolute top-4 left-4 text-2xl cursor-pointer text-dark-blue" onClick={handleBack}/>
                        <FaPenToSquare className="absolute top-[32px] right-4 text-dark-blue cursor-pointer" 
                            onClick={() => setVisible(true)}/>
                        <h1 className="text-3xl font-[600] mb-3">User Information</h1>
                        <div className="flex items-center">
                            <img src={profileImage} alt="" className="w-16 rounded-[50%]"/>
                            <div className="ml-3 h-full border-b border-b-dark-blue flex flex-col justify-center">
                                <h1 className="font-[500] text-[20px]">{user.firstname} {user.lastname}</h1>
                                <span className="text-sm">{user.email}</span>
                            </div>
                        </div>
                        <div className="w-full flex flex-col my-8">
                            <p><span className="font-[600] mr-2">Student ID:</span> {user.student_id}</p>
                            <p><span className="font-[600] mr-2">Year:</span> {user.year} Year</p>
                            <p><span className="font-[600] mr-2">Course:</span> {user.course}</p>
                            <p><span className="font-[600] mr-2">Program:</span> {user.department}</p>
                        </div>
                        <Button onClick={handleLogout}>SIGN OUT</Button>
                    </div>
                </div>
                {getComponent()}
            </section>
        </>
    )
}
export default ProfilePage;
