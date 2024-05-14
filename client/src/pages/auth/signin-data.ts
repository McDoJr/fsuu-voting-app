import {useNavigate} from "react-router-dom";
import {LoadingOptions} from "../../components/loading.tsx";
import {PopupForm} from "../../components/popup.tsx";
import {ChangeEvent, SubmitEvent} from "../../utils/types.ts";
import {SigninForm, validateForm} from "../../utils/forms.ts";
import {ErrorOptions} from "../../components/error-label.tsx";
import axios from "axios";
import {HOST} from "../../utils/data.ts";
import {useContext} from "react";
import {DataContext} from "../../utils/context.ts";

export const SigninData = () => {

    const { saveData } = useContext(DataContext);
    const navigate = useNavigate();
    const { viewLoading, closeLoading, loadingStatus } = LoadingOptions();
    const { handlePopup, getView, closePopup } = PopupForm();
    const { formData, setFormData, handleChange: onChange } = SigninForm();
    const { errors, setErrors, validateErrors, getLabel, getStyleResult } = ErrorOptions();

    const handleChange = (e: ChangeEvent) => {
        onChange(e);
        validateErrors(e.target.name);
    }

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if(Object.keys(errors).length > 0) {
            setErrors(errors);
        }else {
            setErrors({});
            viewLoading();
            const {email, password} = formData;
            if(email === "admin") {
                if(password === "1234") {
                    handlePopup(true, true, "Login as admin successfully!");
                    localStorage.setItem("user", "admin");
                    localStorage.setItem("otp", JSON.stringify(new Date()));
                    setTimeout(() => {
                        closePopup();
                        navigate("/admin/dashboard");
                    }, 1500);
                }else {
                    handlePopup(true, false, "Invalid admin password!");
                    setTimeout(() => closePopup(), 1500);
                }
            }else {
                axios.post(`${HOST}/api/users/login`, formData)
                    .then(res => {
                        const {status, message, data} = res.data;
                        if(status) {
                            handlePopup(true, true, message);
                            setTimeout(() => closePopup(), 1500);
                            saveData(data);
                            navigate("/vote");
                        } else {
                            handlePopup(true, false, message);
                            setTimeout(() => closePopup(), 1500);
                        }
                        closeLoading();
                    })
                    .catch(error => {
                        console.log(error, "here");
                    })
            }
        }
        closeLoading();
    }

    return { loadingStatus, handleSubmit, handleChange, getLabel, getView, errors, setFormData, getStyleResult };

}