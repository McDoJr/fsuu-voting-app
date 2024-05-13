import {getTimeDifference} from "../utils/data.ts";

export const authData = () => {

    const loggedIn = () => {
        return getData();
    }

    const getData = () => {
        const data = localStorage.getItem("user");
        return data ? data : false;
    }

    const isOtp = () => {
        const otp = localStorage.getItem("otp");
        if(otp) {
            const date = new Date(JSON.parse(otp));
            const isStillValid = getTimeDifference(date) <= 300;
            if(!isStillValid) removeOtp(); // Remove the otp from localStorage if it's not already valid
            return isStillValid;
        }
        return false;
    }

    const removeOtp = () => {
        localStorage.removeItem("otp");
    }

    return { loggedIn, getData, isOtp, removeOtp };
}