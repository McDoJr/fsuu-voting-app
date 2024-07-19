import { HOST } from "../../../utils/data";
import { ErrorOptions } from "../../../components/error-label"
import { StringForms } from "../../../utils/forms";
import { ChangeEvent } from "../../../utils/types";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../../../utils/context";

export const EditProfileData = () => {

    const { user, saveData } = useContext(DataContext);
    const { handleChange: onChange, formData } = StringForms({
        student_id: user.student_id,
        course: user.course,
        year: user.year,
        department: user.department
    });
    const { getLabel, validateErrors, getStyleResult } = ErrorOptions();

    const handleChange = (e: ChangeEvent) => {
        onChange(e);
        validateErrors(e.target.name);
    }

    const getValue = (value: string) => {
        return value === 'undefined' ? '' : <string> value;
    }

    const handleUpdate = () => {
        axios.post(`${HOST}/api/users/profile/update`, {...formData, email: user.email})
            .then(res => {
                const {status} = res.data;
                if(status) {
                    const student_id = <string> formData.student_id;
                    const course = <string> formData.course;
                    const year = <string> formData.year;
                    const department = <string> formData.department;
                    const {firstname, lastname, email, password, is_google, picture} = user;
                    const data = {student_id, 
                        firstname,
                        lastname, 
                        course,
                        year, 
                        department,
                        email, 
                        password,
                        is_google,
                        picture};
                    saveData(data);
                }else{
                    console.log('No changes');
                }
            }).catch(console.log);
    }

    return { formData, handleChange, getLabel, getStyleResult, handleUpdate, getValue };
}