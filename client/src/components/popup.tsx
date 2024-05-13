import {useState} from "react";
import Success from "./success.tsx";
import Failed from "./failed.tsx";
import Button from "./button.tsx";

export const PopupForm = () => {
    const [popup, setPopup] = useState({
        state: false,
        status: false,
        message: ""
    });

    const closePopup = () => {
        handlePopup(false, false);
    }

    const handlePopup = (state: boolean, status: boolean, message: string = "") => {
        setPopup({state, status, message});
    }

    const getView = () => {
        return popup.state && getElement();
    }

    const getElement = () => {
        const { status, message } = popup;
        return status ? <Success>{message}</Success> : <Failed>{message}</Failed>
    }

    return { setPopup, handlePopup, closePopup, getView };
}

export const OtpPopup = () => {

    const [otpStatus, setOtpStatus] = useState(false);

    const viewOtpPopup = () => {
        setOtpStatus(true);
    }

    const getOtpPopup = (onClick: () => void) => {

        const handleClick = () => {
            setOtpStatus(false);
            onClick();
        }

        return otpStatus && (
            <section className="w-full h-full absolute top-0 left-0 flex justify-center items-center bg-black/80">
                <div className="py-6 px-10 flex flex-col items-center justify-center bg-white relative">
                    <h1 className="text-3xl font-bold text-dark-blue">VERIFICATION</h1>
                    <p className="mb-6 text-sm">OTP has been sent to your email</p>
                    <Button type="button" onClick={handleClick}>PROCEED</Button>
                </div>
            </section>
        )
    }

    return { getOtpPopup, viewOtpPopup }

}