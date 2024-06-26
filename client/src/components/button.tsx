import React from "react";

type ButtonProps = {
    type?: "submit" | "button",
    onClick?: () => void,
    className?: string,
    children?: React.ReactNode
}

const Button = ({ type = "submit", onClick = () => {}, className = "border-dark-blue", children = "SUBMIT" }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-2 px-10 mt-4 bg-dark-blue text-white font-[500] tracking-wider transition-all border-2 border-dark-blue hover:bg-white hover:text-dark-blue ${className}`}>{children}
        </button>
    )
}
export default Button;
