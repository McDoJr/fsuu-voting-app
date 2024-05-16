import {FaCircleUser} from "react-icons/fa6";
import React from "react";
import {useNavigate} from "react-router-dom";

interface UserNavigationProps {
    children: React.ReactNode
    link: string,
    data: object
}

const UserNavigation = ({ children, link, data }: UserNavigationProps) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/profile", {state: {data, link}});
    }

    return (
        <div className="flex w-full justify-center items-center py-4 bg-dark-blue relative">
            {children}
            <FaCircleUser
                onClick={handleClick}
                className="text-4xl text-white rounded-[50%] absolute right-16 top-[50%] translate-y-[-50%] cursor-pointer"/>
        </div>
    )
}
export default UserNavigation;
