import {LoadingOptions} from "../../components/loading.tsx";
import {OtpPopup, PopupForm} from "../../components/popup.tsx";
import {ErrorOptions} from "../../components/error-label.tsx";
import {SignupForm, validateForm} from "../../utils/forms.ts";
import {ChangeEvent, GoogleInfo, SubmitEvent} from "../../utils/types.ts";
import axios from "axios";
import {HOST} from "../../utils/data.ts";
import {useNavigate} from "react-router-dom";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState} from "react";

export const SignupData = () => {

    const navigate = useNavigate();
    const { viewLoading, closeLoading, loadingStatus } = LoadingOptions();
    const { handlePopup, getView, closePopup } = PopupForm();
    const { formData, setFormData, handleChange: onChange } = SignupForm();
    const { errors, setErrors, validateErrors, getLabel, getStyleResult } = ErrorOptions();
    const { getOtpPopup, viewOtpPopup } = OtpPopup();
    const [visible, setVisible] = useState(false);


    const handleOtpProceed = () => {
        navigate("/signup/otp", {state: {data: formData}})
    }

    const handleChange = (e: ChangeEvent) => {
        onChange(e);
        validateErrors(e.target.name);
    }


    const handleGoogleSignUp = (response: CredentialResponse) => {
        const {credential} = response;
        if(credential === undefined) return;

        // const student_id: string = <string> formData.student_id;
        // const department: string = <string> formData.department;
        // const course: string = <string> formData.course;
        // const year: string = <string> formData.year;
        const { given_name: firstname, family_name: lastname, email, picture } = jwtDecode(credential) as GoogleInfo;
        // const data = {...formData, firstname, lastname, email, password: 'undefined', is_google: 'yes', picture};
        setFormData({...formData, firstname, lastname, email,
            password: 'undefined', confirm_password: 'undefined', is_google: 'yes', picture});
        setVisible(true);
    }

    const handleGoogleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if(Object.keys(errors).length > 0) {
            setErrors(errors);
        }else {
            setErrors({});
            axios.post(`${HOST}/api/users/register`, formData)
                .then(res => {
                    const {status, message} = res.data;
                    if(status) {
                        handlePopup(true, true, message);
                        setTimeout(() => {
                            handlePopup(true, true, message);
                            setTimeout(() => closePopup(), 1500);
                            navigate("/signin");
                        }, 1500);
                    } else {
                        handlePopup(true, false, message);
                        setTimeout(() => closePopup(), 1500);
                    }
                    setVisible(false);
                    setFormData({student_id: ''});
                })
                .catch(console.log);
        }
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
            const {email} = formData;
            axios.post(`${HOST}/api/users/signup`, {email})
                .then(res => {
                    const {status, message} = res.data;
                    if(status) {
                        axios.post(`${HOST}/api/users/otp`, {email})
                            .then(res => {
                                const {otp} = res.data;
                                if(otp) {
                                    localStorage.setItem("otp", JSON.stringify(new Date()));
                                    setFormData({...formData, otp})
                                    viewOtpPopup();
                                }
                                closeLoading();
                            }).catch(console.log)
                    }else{
                        handlePopup(true, false, message);
                        setTimeout(() => closePopup(), 1500);
                        closeLoading();
                    }
                }).catch(console.log)
        }
    }

    return { loadingStatus, handleSubmit, handleGoogleSignUp, handleGoogleSubmit,  handleChange, visible, getLabel, getView, errors, setFormData, getStyleResult, formData, getOtpPopup, handleOtpProceed };
}
