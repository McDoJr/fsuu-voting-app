import {useState} from "react";
import Success from "./success.tsx";
import Failed from "./failed.tsx";

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