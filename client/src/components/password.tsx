import React, {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {ChangeEvent} from "../utils/types.ts";

type PasswordProps = {
    state?: boolean
    placeholder: string,
    name: string,
    id?: string | undefined,
    onChange: (e: ChangeEvent) => void,
    className?: string,
    containerClass?: string,
    children?: React.ReactNode
}

const PasswordOptions = () => {

    const [status, setStatus] = useState(false);

    const handleClick = () => {
        setStatus(!status);
    }

    const className = "absolute w-4 h-4 right-3 top-2.5 text-dark-blue cursor-pointer";

    const getView = () => {
        return status ? <FaEye className={className} onClick={handleClick}/> : <FaEyeSlash className={className} onClick={handleClick}/>
    }

    return { status, getView };
}

const Password = ({ state = false, placeholder, name, id = undefined, onChange,
                      className = "w-full border border-gray-400 px-4 py-1.5 text-sm text-dark-blue rounded-md mb-3 outline-1",
                      containerClass = '',
                      children }: PasswordProps) => {

    const { status, getView } = PasswordOptions();

    return (
        <div className={`w-full flex flex-col relative ${containerClass}`}>
            {children}
            <input type={status ? 'text' : 'password'} placeholder={placeholder} name={name} id={id} onChange={onChange}
                   className={`${className} ${children ? 'border border-red-500' : 'outline-dark-blue'}`}/>
            {state && getView()}
        </div>
    )
}


export default Password;
