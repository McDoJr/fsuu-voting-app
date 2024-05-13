import {FaCheckCircle} from "react-icons/fa";
import React from "react";

type SuccessProps = {
    children?: React.ReactNode
}

const Success = ({ children }: SuccessProps) => {
    return (
        <section className="w-full h-screen absolute left-0 top-0 bg-black/80 flex justify-center items-center">
            <div className="p-16 bg-white rounded-2xl flex flex-col justify-center items-center">
                <FaCheckCircle className="w-16 h-16 text-green-500"/>
                <h1 className="text-2xl text-green-500 font-bold mt-3">{children}</h1>
            </div>
        </section>
    )
}
export default Success;
