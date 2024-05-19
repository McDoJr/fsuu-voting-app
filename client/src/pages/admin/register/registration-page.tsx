import AdminContainer from "../admin-container.tsx";
import {convertFormElement, DEPARTMENTS, HOST} from "../../../utils/data.ts";
import {SubmitEvent} from "../../../utils/types.ts";
import Button from "../../../components/button.tsx";
import {RegistrationForm} from "../../../utils/forms.ts";
import axios from "axios";
import {positions} from "../../../utils/mock-data.ts";
import {currentDate, setTitle} from "../../../utils/utils.ts";
import {useEffect} from "react";

const RegistrationPage = () => {

    const { formData, setFormData, handleChange } = RegistrationForm();

    useEffect(() => {
        setTitle('Registration Of Candidacy');
    }, []);

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        let data = formData;
        if(data.type === "executive") {
            data = {...data, department: "NA"};
        }
        axios.post(`${HOST}/api/admin/insert/nominees`, data)
            .then(res => {
                console.log(res.data.data);
                setFormData({});
                const element = convertFormElement(document.getElementById("reg__form")!);
                element.reset();
            })
            .catch(console.log);
    }

    const departmentState = formData.type && formData.type === "local";

    return (
        <AdminContainer page="registration">
            <section className="w-full h-full p-8 flex flex-col relative">
                <div className="flex w-full mb-8">
                    <img src={require('@assets/fsuu_logo.png')} alt="" className="w-20"/>
                    <div className="flex flex-col ml-2">
                        <h1 className="text-3xl font-bold tracking-wider">Registration</h1>
                        <p className="font-[500]">{currentDate()}</p>
                    </div>
                </div>
                <form action="" className="py-8 px-36 flex flex-col bg-gray-200 items-center border shadow-xl self-center"
                      onSubmit={handleSubmit} id="reg__form">
                    <h1 className="text-3xl font-[600] mb-6">Candidate Details</h1>
                    <input type="text" placeholder="First Name" name="firstname"
                           onChange={handleChange}
                           className={`w-full border border-gray-400 px-4 py-1.5 text-sm text-black rounded-md mb-3 outline-1`}/>
                    <input type="text" placeholder="Last Name" name="lastname"
                           onChange={handleChange}
                           className={`w-full border border-gray-400 px-4 py-1.5 text-sm text-black rounded-md mb-3 outline-1`}/>
                    <input type="text" placeholder="Student ID" name="student_id"
                           onChange={handleChange}
                           className={`w-full border border-gray-400 px-4 py-1.5 text-sm text-black rounded-md mb-3 outline-1`}/>
                    <select name="year"
                            onChange={handleChange}
                            className={`w-full cursor-pointer border border-gray-400 px-4 py-1.5 text-sm ${formData.year ? 'text-black' : 'text-placeholder'} rounded-md mb-3 outline-1`}>
                        <option hidden>Year</option>
                        <option value="1" className="text-dark-blue">I</option>
                        <option value="2" className="text-dark-blue">II</option>
                        <option value="3" className="text-dark-blue">III</option>
                        <option value="4" className="text-dark-blue">IV</option>
                    </select>
                    <select name="type"
                            onChange={handleChange}
                            className={`w-full cursor-pointer border border-gray-400 px-4 py-1.5 text-sm ${formData.year ? 'text-black' : 'text-placeholder'} rounded-md mb-3 outline-1`}>
                        <option hidden>Type</option>
                        <option value="executive" className="text-dark-blue">Executive</option>
                        <option value="local" className="text-dark-blue">Local</option>
                    </select>
                    {departmentState && (
                        <select name="department"
                                onChange={handleChange}
                                className={`w-full cursor-pointer border border-gray-400 px-4 py-1.5 text-sm ${formData.department ? 'text-black' : 'text-placeholder'} rounded-md mb-3 outline-1`}>
                            <option hidden>Department</option>
                            {Object.keys(DEPARTMENTS).map((data, index) => {
                                return <option value={data} className="text-dark-blue" key={index}>{data}</option>;
                            })}
                        </select>
                    )}
                    <select name="position"
                            onChange={handleChange}
                            className={`w-full cursor-pointer border border-gray-400 px-4 py-1.5 text-sm ${formData.department ? 'text-black' : 'text-placeholder'} rounded-md mb-3 outline-1`}>
                        <option hidden>Position</option>
                        {formData.type && positions(formData.type + "").map((data, index) => {
                            return <option value={data} className="text-dark-blue" key={index}>{data}</option>;
                        })}
                    </select>
                    <Button>SUBMIT</Button>
                </form>
            </section>
        </AdminContainer>
    )
}
export default RegistrationPage;
