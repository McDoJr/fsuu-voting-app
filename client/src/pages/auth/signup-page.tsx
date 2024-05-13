import {SignupData} from "./signup-data.ts";
import {Link} from "react-router-dom";
import Password from "../../components/password.tsx";
import {COURSES, DEPARTMENTS} from "../../utils/data.ts";

const SignupPage = () => {

    const { handleSubmit, handleChange, formData, getView, getLabel, loadingStatus, getStyleResult, getOtpPopup, handleOtpProceed } = SignupData();
    // const [view, setView] = useState(false);

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
                            onClick={() => {}}>Terms and Conditions</span></label>
                    </div>
                    <button
                        type="submit"
                        className={`py-2 px-10 mt-4 bg-dark-blue text-white font-[500] tracking-wider transition-all border-2 border-dark-blue hover:bg-white hover:text-dark-blue ${formData.terms ? "" : "pointer-events-none bg-dark-blue/60 border-dark-blue/5"}`}>SUBMIT
                    </button>
                    <p className="text-sm mt-1">
                        Already have an account?
                        <Link to="/signin" className="underline text-dark-blue ml-1">Sign In</Link>
                    </p>
                </form>
            </div>
            {loadingStatus()}
            {getView()}
            {getOtpPopup(handleOtpProceed)}
            {/*{view && <TermsAndCondition setView={setView} handleAgreeAndClose={handleAgreeAndClose}/>}*/}
        </section>
    )
}
export default SignupPage;
