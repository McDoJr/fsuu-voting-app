import {useState} from "react";
import {ChangeEvent, FormObject, StringObject} from "./types.ts";

export const Forms = (data: FormObject = {}) => {
    const [formData, setFormData] = useState(data);

    const handleChange = (e: ChangeEvent) => {
        const {name, value} = e.target;
        if(value && name === "student_id" && !/[0-9]/.test(value.charAt(value.length - 1))) {
            return;
        }

        const getValue = () => {
            if(e.target.type === "checkbox") {
                const element = <HTMLInputElement> e.target;
                return element.checked;
            }
            return value;
        }

        setFormData({...formData, [name]: getValue()});
    }

    return {formData, setFormData, handleChange};
}

export const UserForm = () => {
    return Forms({
        student_id: "",
        firstname: "",
        lastname: "",
        course: "",
        year: "",
        department: "",
        email: "",
        password: ""
    });
}

export const SignupForm = () => {
    return Forms({
        student_id: "",
        firstname: "",
        lastname: "",
        course: "",
        year: "",
        department: "",
        email: "",
        password: "",
        confirm_password: "",
        terms: false,
        otp: ""
    });
}

export const SigninForm = () => {
    return Forms({
        email: "",
        password: ""
    });
}

export const OtpForm = () => {
    return Forms({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: ""
    });
}

export const validateForm = (formData: FormObject) => {

    const errors: StringObject = {};
    const emailFormat = /^[a-z]+\.[a-z]+@urios\.edu\.ph$/;

    for(const key in formData) {
        const value = formData[key];
        if(!value && key === 'firstname') {
            errors.firstname = "Required!";
        }
        if(!value && key === 'lastname') {
            errors.lastname = "Required!";
        }
        if(!value && key === 'email') {
            errors.email = "Required!";
        }
        if(value && key === 'email' && typeof value === "string" && !emailFormat.test(value) && value !== "admin") {
            errors.email = "Invalid Email!";
        }
        if(!value && key === 'password') {
            errors.password = "Required!";
        }
        if(!value && key === 'confirm_password') {
            errors.confirm_password = "Required!";
        }
        if(value && key === 'confirm_password' && value !== formData['password']) {
            errors.confirm_password = "Password dont match!";
        }
        if(!value && key === 'course') {
            errors.course = "Required!";
        }
        if(!value && key === 'department') {
            errors.department = "Required!";
        }
        if(!value && key === 'year') {
            errors.year = "Required!";
        }
        if(!value && key === 'student_id') {
            errors.student_id = "Required!";
        }
    }

    return errors;
}