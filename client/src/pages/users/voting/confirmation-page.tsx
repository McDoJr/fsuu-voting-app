import {useLocation, useNavigate} from "react-router-dom";
import ConfirmationSection from "./confirmation-section.tsx";
import Button from "../../../components/button.tsx";
import {useContext, useEffect, useState} from "react";
import UserNavigation from "../user-navigation.tsx";
import axios from "axios";
import {HOST} from "../../../utils/data.ts";
import {DataContext} from "../../../utils/context.ts";
import {NomineesObject} from "../../../utils/types.ts";
import {setTitle} from "../../../utils/utils.ts";

const ConfirmationPage = () => {

    const {nominees, fetchHistory, user, setNotification, notification} = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state.data;
    const [formData, setFormData] = useState(data);

    useEffect(() => {
        setTitle('Votes Confirmation');
    }, []);

    const handleChange = (type: string, position: string, uid: number) => {
        const values = formData[type];
        values[position] = uid;
        const updatedData = {...formData, [type]: values};
        setFormData(updatedData);
        // TODO: Find a better way to update history
        navigate(".", {state: {data: updatedData}})
    }

    const getVoteForm = () => {
        const result: NomineesObject = [];
        for(const type in formData) {
            for(const position in formData[type]) {
                const vote = formData[type][position];
                const candidate = nominees.find(value => value.uid === vote);
                candidate!.votes = candidate!.votes + 1;
                result.push(candidate!);
            }
        }
        return result;
    }

    const handleSubmit = () => {
        const {student_id, department} = user;
        const date = JSON.stringify(new Date());
        axios.post(`${HOST}/api/admin/update`, {result: getVoteForm(), student_id, department, date})
            .then(res => {
                const {status} = res.data;
                if(status) {
                    console.log("Vote has been recorded!")
                    fetchHistory();
                    setNotification(notification+1);
                    localStorage.setItem("notification", JSON.stringify(notification+1));
                    navigate("/vote/success");
                }
            }).catch(console.log);
    }

    return (
        <section className="w-full min-h-screen flex flex-col items-center font-poppins pb-8">
            <UserNavigation data={formData} link="/vote/confirmation">
                <img src={require('@assets/fsuu_logo.png')} alt="" className="w-16 mr-3"/>
                <h1 className="text-3xl text-white font-[600] tracking-wider">Confirmation</h1>
            </UserNavigation>
            <div className="w-full flex px-16">
                {Object.keys(data).map((value, index) => {
                    return <ConfirmationSection type={value} data={data[value]} handleChange={handleChange} key={index}/>
                })}
            </div>
            <Button onClick={handleSubmit} />
        </section>
    )
}
export default ConfirmationPage;
