import { FaXmark } from "react-icons/fa6";
import Button from "../../../components/button";
import { COURSES, DEPARTMENTS } from "../../../utils/data";
import { EditProfileData } from "./edit-profile-data";
import { useState } from "react";


export const EditProfile = () => {

    const [visible, setVisible] = useState<boolean>(false);
    const { getLabel, getStyleResult, handleChange, formData, handleUpdate: handleSubmit, getValue } = EditProfileData();

    const handleUpdate = () => {
        handleSubmit();
        setVisible(false);
    }

    const getComponent = () => {
        return (
            visible && <section className="absolute w-full h-screen flex justify-center items-center bg-black/50">
                <div className="flex flex-col p-10 bg-white w-[350px] relative">
                    <h1 className="text-center text-2xl font-bold mb-6">PROFILE DETAILS</h1>
                    <FaXmark className="absolute right-3 top-3 cursor-pointer hover:text-red-500" onClick={() => setVisible(false)}/>
                    <div className="w-full mr-3 flex flex-col relative">
                            {getLabel("student_id")}
                            <input type="text" placeholder="Student ID" name="student_id"
                                   value={getValue(formData.student_id)}
                                   onChange={handleChange}
                                   className={`w-full border border-gray-400 px-4 py-1.5 text-sm text-black rounded-md mb-3 outline-1 ${getStyleResult('student_id')}`}/>
                        </div>
                    <div className="w-full mr-3 flex flex-col relative">
                        {getLabel("department")}
                        <select name="department"
                                value={getValue(formData.department)}
                                onChange={handleChange}
                                className={`w-full cursor-pointer border border-gray-400 px-4 py-1.5 text-sm ${formData.department ? 'text-black' : 'text-placeholder'} rounded-md mb-3 mr-3 outline-1 ${getStyleResult('department')}`}>
                            <option hidden>Department</option>
                            {Object.keys(DEPARTMENTS).map((data, index) => {
                                return <option value={data} className="text-dark-blue" key={index}>{data}</option>;
                            })}
                        </select>
                    </div>
                    <div className="w-full mr-3 flex flex-col relative">
                        {getLabel("course")}
                        <select name="course"
                                value={getValue(formData.course)}
                                onChange={handleChange}
                                className={`w-full border border-gray-400 px-4 py-1.5 text-sm ${formData.course ? 'text-black' : 'text-placeholder'} rounded-md mb-3 mr-3 outline-1 ${formData.department ? 'cursor-pointer' : 'pointer-events-none'} ${getStyleResult('course')}`}>
                            <option hidden>Course</option>
                            {getValue(formData.department) && COURSES(formData.department + "").map((data, index) => {
                                return <option value={data} className="text-dark-blue" key={index}>{data}</option>
                            })}
                        </select>
                    </div>
                    <div className="w-full flex flex-col relative">
                        {getLabel("year")}
                        <select name="year"
                                value={getValue(formData.year)}
                                onChange={handleChange}
                                className={`w-full cursor-pointer border border-gray-400 px-4 py-1.5 text-sm ${formData.year ? 'text-black' : 'text-placeholder'} rounded-md mb-3 outline-1 ${getStyleResult('year')}`}>
                            <option hidden>Year</option>
                            <option value="1" className="text-dark-blue">I</option>
                            <option value="2" className="text-dark-blue">II</option>
                            <option value="3" className="text-dark-blue">III</option>
                            <option value="4" className="text-dark-blue">IV</option>
                        </select>
                    </div>
                    <Button onClick={handleUpdate}>SAVE</Button>
                </div>
            </section>
        )
    }

    return { getComponent, setVisible };
}
