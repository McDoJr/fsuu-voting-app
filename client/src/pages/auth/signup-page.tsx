import {SignupData} from "./signup-data.ts";
import {Link, useNavigate} from "react-router-dom";
import Password from "../../components/password.tsx";
import {convertInputElement, COURSES, DEPARTMENTS} from "../../utils/data.ts";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../utils/context.ts";
import {authData} from "../../hooks/auth-hooks.ts";
import {setTitle} from "../../utils/utils.ts";
import TermsAndCondition from "./terms-and-condition.tsx";
import Button from "../../components/button.tsx";
import { GoogleLogin } from "@react-oauth/google";

const SignupPage = () => {

    const navigate = useNavigate();
    const {user} = useContext(DataContext);
    const { handleSubmit, handleChange, formData, handleGoogleSubmit, visible, setFormData, getView, getLabel, loadingStatus, getStyleResult, getOtpPopup, handleOtpProceed, handleGoogleSignUp } = SignupData();
    const [view, setView] = useState(false);


    useEffect(() => {
        setTitle('Sign Up');
        if(authData().loggedIn()) {
            navigate('/admin/dashboard');
        }
        if(Object.values(user).every(value => value)) {
            navigate('/vote');
        }
    }, []);

    const handleAgreeAndClose = () => {
        const element = convertInputElement(document.getElementById("terms")!);
        element.checked = true;
        setView(false);
        setFormData({...formData, terms: true})
    }

    const getAdditionalDetails = () => {
        return (
            <section className="w-full h-screen absolute top-0 left-0 flex justify-center items-center bg-black/80">
                <form
                    onSubmit={handleGoogleSubmit}
                    className="w-[450px] flex flex-col p-10 bg-white">
                    <h1 className="font-prompt font-bold text-dark-blue text-3xl mb-6 drop-shadow-lg text-center">REQUIRED DETAILS</h1>
                    <div className="flex">
                        <div className="w-full mr-3 flex flex-col relative">
                            {getLabel("student_id")}
                            <input type="text" placeholder="Student ID" name="student_id"
                                   value={formData.student_id + ""}
                                   onChange={handleChange}
                                   className={`w-full border border-gray-400 px-4 py-1.5 text-sm text-black rounded-md mb-3 outline-1 ${getStyleResult('student_id')}`}/>
                        </div>
                        <div className="w-full flex flex-col relative">
                            {getLabel("department")}
                            <select name="department"
                                    onChange={handleChange}
                                    className={`w-full cursor-pointer border border-gray-400 px-4 py-1.5 text-sm ${formData.department ? 'text-black' : 'text-placeholder'} rounded-md mb-3 mr-3 outline-1 ${getStyleResult('department')}`}>
                                <option hidden>Department</option>
                                {Object.keys(DEPARTMENTS).map((data, index) => {
                                    return <option value={data} className="text-dark-blue" key={index}>{data}</option>;
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-full mr-3 flex flex-col relative">
                            {getLabel("course")}
                            <select name="course"
                                    onChange={handleChange}
                                    className={`w-full border border-gray-400 px-4 py-1.5 text-sm ${formData.course ? 'text-black' : 'text-placeholder'} rounded-md mb-3 mr-3 outline-1 ${formData.department ? 'cursor-pointer' : 'pointer-events-none'} ${getStyleResult('course')}`}>
                                <option hidden>Course</option>
                                {formData.department && COURSES(formData.department + "").map((data, index) => {
                                    return <option value={data} className="text-dark-blue" key={index}>{data}</option>
                                })}
                            </select>
                        </div>
                        <div className="w-full flex flex-col relative">
                            {getLabel("year")}
                            <select name="year"
                                    onChange={handleChange}
                                    className={`w-full cursor-pointer border border-gray-400 px-4 py-1.5 text-sm ${formData.year ? 'text-black' : 'text-placeholder'} rounded-md mb-3 outline-1 ${getStyleResult('year')}`}>
                                <option hidden>Year</option>
                                <option value="1" className="text-dark-blue">I</option>
                                <option value="2" className="text-dark-blue">II</option>
                                <option value="3" className="text-dark-blue">III</option>
                                <option value="4" className="text-dark-blue">IV</option>
                            </select>
                        </div>
                    </div>
                    <Button>SUBMIT</Button>
                </form>
            </section>
        )
    };

    return (
        <section className="w-full h-screen flex flex-col justify-center items-center relative">
            <h1 className="font-prompt font-bold text-dark-blue text-5xl mb-6 drop-shadow-lg">FSUU VOTING SYSTEM</h1>
            <div className="flex rounded-md shadow-lg shadow-gray-700">
                <img src={require('@assets/login.png')} alt="" className="w-[500px]"/>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col select-none justify-center items-center bg-white py-6 px-10 my-auto mx-auto">
                    <img src={require('@assets/fsuu_logo.png')} alt="Logo.png" className="w-24 mb-3"/>
                    <h1 className="text-3xl font-bold text-dark-blue mb-6">SIGN UP</h1>
                    <div className="flex w-full">
                        <div className="w-full mr-3 flex flex-col relative">
                            {getLabel("student_id")}
                            <input type="text" placeholder="Student ID" name="student_id"
                                   value={formData.student_id + ""}
                                   onChange={handleChange}
                                   className={`w-full border border-gray-400 px-4 py-1.5 text-sm text-black rounded-md mb-3 outline-1 ${getStyleResult('student_id')}`}/>
                        </div>
                        <div className="w-full mr-3 flex flex-col relative">
                            {getLabel("firstname")}
                            <input type="text" placeholder="First Name" name="firstname"
                                   onChange={handleChange}
                                   className={`w-full border border-gray-400 px-4 py-1.5 text-sm text-black rounded-md mb-3 mr-3 outline-1 ${getStyleResult('firstname')}`}/>
                        </div>
                        <div className="w-full flex flex-col relative">
                            {getLabel("lastname")}
                            <input type="text" placeholder="Last Name" name="lastname"
                                   onChange={handleChange}
                                   className={`w-full border border-gray-400 px-4 py-1.5 text-sm text-black rounded-md mb-3 outline-1 ${getStyleResult('lastname')}`}/>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-full mr-3 flex flex-col relative">
                            {getLabel("department")}
                            <select name="department"
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
                                    onChange={handleChange}
                                    className={`w-full border border-gray-400 px-4 py-1.5 text-sm ${formData.course ? 'text-black' : 'text-placeholder'} rounded-md mb-3 mr-3 outline-1 ${formData.department ? 'cursor-pointer' : 'pointer-events-none'} ${getStyleResult('course')}`}>
                                <option hidden>Course</option>
                                {formData.department && COURSES(formData.department + "").map((data, index) => {
                                    return <option value={data} className="text-dark-blue" key={index}>{data}</option>
                                })}
                            </select>
                        </div>
                        <div className="w-full flex flex-col relative">
                            {getLabel("year")}
                            <select name="year"
                                    onChange={handleChange}
                                    className={`w-full cursor-pointer border border-gray-400 px-4 py-1.5 text-sm ${formData.year ? 'text-black' : 'text-placeholder'} rounded-md mb-3 outline-1 ${getStyleResult('year')}`}>
                                <option hidden>Year</option>
                                <option value="1" className="text-dark-blue">I</option>
                                <option value="2" className="text-dark-blue">II</option>
                                <option value="3" className="text-dark-blue">III</option>
                                <option value="4" className="text-dark-blue">IV</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="w-full mr-3 flex flex-col relative">
                            {getLabel("email")}
                            <input type="text" placeholder="GSuite Email" name="email"
                                   onChange={handleChange}
                                   className={`w-full border border-gray-400 px-4 py-1.5 text-sm text-black rounded-md mb-3 outline-1 ${getStyleResult('email')}`}/>
                        </div>
                        <Password placeholder="Password" name="password" onChange={handleChange} containerClass='mr-3' >
                            {getLabel('password')}
                        </Password>
                        <Password placeholder="Confirm Password" name="confirm_password" onChange={handleChange} >
                            {getLabel('confirm_password')}
                        </Password>
                    </div>
                    <div className="flex items-center self-start">
                        <input type="checkbox" className="text-sm mr-2" id="terms" name="terms" value={formData.terms + ""}
                               onChange={handleChange}/>
                        <label htmlFor="" className="text-[12px]">I agree to the <span
                            className="text-[12px] text-blue-600 cursor-pointer underline"
                            onClick={() => setView(true)}>Terms and Conditions</span></label>
                    </div>
                    <Button className={`${formData.terms ? "" : "pointer-events-none bg-dark-blue/60 border-dark-blue/5"} mb-3`}>
                        SUBMIT
                    </Button>
                    <GoogleLogin 
                        text="signup_with"
                        locale="en"
                        onSuccess={handleGoogleSignUp} 
                        onError={() => console.log("Sign Up Failed!")}/>
                    <p className="text-sm mt-1">
                        Already have an account?
                        <Link to="/signin" className="underline text-dark-blue ml-1">Sign In</Link>
                    </p>
                </form>
            </div>
            {loadingStatus()}
            {getView()}
            {getOtpPopup(handleOtpProceed)}
            {visible && getAdditionalDetails()}
            {view && <TermsAndCondition setView={setView} handleAgreeAndClose={handleAgreeAndClose}/>}
        </section>
    )
}
export default SignupPage;
