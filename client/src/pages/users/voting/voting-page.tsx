import VotingSection from "./voting-section.tsx";
import Button from "../../../components/button.tsx";
import {VotingData} from "./voting-data.ts";
import {useContext, useEffect, useState} from "react";
import {AllRecordObject} from "../../../utils/types.ts";
import {DataContext} from "../../../utils/context.ts";
import {getLogo, setTitle} from "../../../utils/utils.ts";
import {useNavigate} from "react-router-dom";
import UserNavigation from "../user-navigation.tsx";
import {positions} from "../../../utils/mock-data.ts";

const VotingPage = () => {

    const navigate = useNavigate();
    const { user, nominees, history } = useContext(DataContext);
    const [type, setType] = useState('executive');
    const { records, handleChange, formData, refreshForm } = VotingData(type, nominees, user.department);
    const [votes, setVotes] = useState<AllRecordObject>({});

    const logo = type === "executive" ? require('@assets/executive.png') : getLogo(user.department);

    useEffect(() => {
        setTitle('Vote');
        if(history.find(value => value.student_id === user.student_id)) {
            navigate('/profile');
        }
    }, []);

    const handleSubmit = () => {
        const updatedVotes = {...votes, [type]: formData};
        setVotes(updatedVotes);
        if(Object.keys(updatedVotes).length === 1) {
            setType("local");
            refreshForm();
        }else {
            navigate("/vote/confirmation", {state: {data: updatedVotes}})
        }
    }

    const executiveCompleted = Object.values(formData).filter(value => value).length == 4;
    const localCompleted = Object.values(formData).filter(value => value).length == 8;

    const completed = executiveCompleted || localCompleted;

    return (
        <section className="w-full min-h-screen flex flex-col font-poppins">
            <UserNavigation data={formData} link="/vote">
                <img src={require('@assets/fsuu_logo.png')} alt="" className="w-16 mr-3"/>
                <img src={logo} alt="" className="w-[58px] mr-3 rounded-[50%] border border-black"/>
                <h1 className="text-3xl text-white font-[600] tracking-wider">{type === "executive" ? "Executive Council" : "Local Department"}</h1>
            </UserNavigation>
            <div className="h-full w-full px-28 pt-6 pb-12 flex flex-col items-center" id="vote__form">
                <h1 className="text-[36px] font-prompt">List of Candidates</h1>
                <h2 className="self-start">(1 vote per position only)</h2>
                {positions(type).map((position, index) => {
                    return <VotingSection position={position} data={records} handleChange={handleChange} key={index}/>
                })}
                <Button type="button"
                        className={completed ? "" : "pointer-events-none bg-dark-blue/60 border-dark-blue/5"} onClick={handleSubmit} >NEXT
                </Button>
            </div>
        </section>
    )
}
export default VotingPage;
