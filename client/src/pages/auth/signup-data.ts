import {LoadingOptions} from "../../components/loading.tsx";
import {PopupForm} from "../../components/popup.tsx";
import {ErrorOptions} from "../../components/error-label.tsx";
import {SignupForm, validateForm} from "../../utils/forms.ts";
import {ChangeEvent, SubmitEvent} from "../../utils/types.ts";
import axios from "axios";
import {HOST} from "../../utils/data.ts";
import {useNavigate} from "react-router-dom";

export const SignupData = () => {

    const navigate = useNavigate();
    const { viewLoading, closeLoading, loadingStatus } = LoadingOptions();
    const { handlePopup, getView, closePopup } = PopupForm();
    const { formData, setFormData, handleChange: onChange } = SignupForm();
    const { errors, setErrors, validateErrors, getLabel, getStyleResult } = ErrorOptions();

    const handleChange = (e: ChangeEvent) => {
        onChange(e);
        validateErrors(e.target.name);
    }

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        if(!formData.terms) return;
        const errors = validateForm(formData);
        if(Object.keys(errors).length > 0) {
            setErrors(errors);
        }else {
            setErrors({});
            viewLoading();
            axios.post(`${HOST}/api/users/signup`, {email: formData.email})
                .then(res => {
                    const {status, message} = res.data;
                    if(status) {
                        axios.post(`${HOST}/api/users/otp`, {email: formData.email})
                            .then(res => {
                                const {otp} = res.data;
                                navigate("/signup/otp", {state: {data: {...formData, otp}}});
                                closeLoading();
                            })
                    }else{
                        handlePopup(true, false, message);
                        setTimeout(() => closePopup(), 1500);
                        closeLoading();
                    }
                })
        }
    }

    return { loadingStatus, handleSubmit, handleChange, getLabel, getView, errors, setFormData, getStyleResult, formData };
}
