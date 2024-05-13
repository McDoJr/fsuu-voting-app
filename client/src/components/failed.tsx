import {FaCircleXmark} from "react-icons/fa6";
import React from "react";

type FailedProps = {
    children?: React.ReactNode
}

const Failed = ({ children }: FailedProps) => {
    return (
        <section className="w-full h-screen absolute top-0 left-0 bg-black/80 flex justify-center items-center">
            <div className="p-16 bg-white rounded-2xl flex flex-col justify-center items-center">
                <FaCircleXmark className="w-16 h-16 text-red-500"/>
                <h1 className="text-2xl text-red-500 font-bold mt-3">{children}</h1>
            </div>
        </section>
    )
}
export default Failed;
