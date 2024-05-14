import {FaCircleUser} from "react-icons/fa6";
import {candidateList} from "../../../utils/mock-data.ts";
import VotingSection from "./voting-section.tsx";
import Button from "../../../components/button.tsx";

const VotingPage = () => {

    const executive = candidateList("executive");

    return (
        <section className="w-full h-screen flex flex-col font-poppins">
            <div className="flex justify-center items-center py-4 bg-dark-blue relative">
                <img src={require('@assets/fsuu_logo.png')} alt="" className="w-16 mr-3"/>
                <h1 className="text-3xl text-white font-[600] tracking-wider">Executive Council</h1>
                <FaCircleUser className="text-4xl text-white rounded-[50%] absolute right-16 top-[50%] translate-y-[-50%] cursor-pointer"/>
            </div>
            <div className="h-full w-full px-28 pt-6 pb-16 flex flex-col items-center">
                <h1 className="self-center text-[36px] font-prompt">List of Candidates</h1>
                <h2>(1 vote per position only)</h2>
                {Object.keys(executive).map((title, index) => {
                    return <VotingSection title={title} data={executive} key={index}/>
                })}
                <Button type="button">NEXT</Button>
            </div>
        </section>
    )
}
export default VotingPage;
