import {PopupForm} from "../../components/popup.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {OtpForm} from "../../utils/forms.ts";
import {ChangeEvent, KeyDownEvent, SubmitEvent} from "../../utils/types.ts";
import axios from "axios";
import {HOST} from "../../utils/data.ts";
import {authData} from "../../hooks/auth-hooks.ts";

const OtpData = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { handlePopup, getView, closePopup } = PopupForm();
    const { formData, setFormData } = OtpForm();

    const signupData = location.state.data;

    const onKeyDown = (e: KeyDownEvent, index: number) => {
        if(e.key === "Backspace") {
            const element = <HTMLInputElement> e.target;
            const data = element.value;
            const other = `${index > 0 ? index - 1 : index}`;
            const value = data ? data[data.length-1] : data;
            const otherElement = <HTMLInputElement> document.getElementById(other);
            if(!value && otherElement) otherElement.focus();
        }
    }

    const sendToLandingPage = () => {
        navigate("/signin");
    }

    const onChange = (e: ChangeEvent, index: number) => {
        const data = e.target.value;
        if(data && !/[0-9]/.test(data[data.length - 1])) {
            return
        }
        const value = data ? data[data.length-1] : data;
        const other = index + 1;
        if(!formData[index]) {
            const otherElement = <HTMLInputElement> document.getElementById(other + "");
            if(index < 5 && otherElement) otherElement.focus();
        }
        setFormData({...formData, [index]: value});
    }

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        if(signupData.otp !== Object.values(formData).join("")) {
            handlePopup(true, false, `Invalid OPT`);
            setTimeout(() => closePopup(), 1500);
            return;
        }
        axios.post(`${HOST}/api/users/register`, signupData)
            .then(res => {
                const {status, message} = res.data;
                if(status) {
                    handlePopup(true, true, message);
                    authData().removeOtp();
                    setTimeout(() => {
                        closePopup();
                        sendToLandingPage();
                    }, 1500);
                } else {
                    handlePopup(true, false, message);
                    setTimeout(() => closePopup(), 1500);
                }
            })
            .catch(console.log);
    }

    return { handleSubmit, onChange, onKeyDown, getView, formData, sendToLandingPage };
}
export default OtpData;
