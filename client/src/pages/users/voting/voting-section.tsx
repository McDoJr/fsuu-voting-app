import {ResultsObject} from "../../../utils/types.ts";
import {format} from "../../../utils/utils.ts";

interface VotingSectionProps {
    title: string,
    data: ResultsObject
}

const VotingSection = ({ title, data }: VotingSectionProps) => {
    return (
        <div className="w-full flex flex-col items-center mb-16">
            <h3 className="self-start text-2xl font-[600]">{format(title)} Position</h3>
            <div className="flex flex-wrap mt-6">
                {data[title].map((value, index) => {
                    return (
                        <div key={index} className="flex flex-col items-center mx-6">
                            <img src={require('@assets/user.png')} alt="" className="w-24"/>
                            <div className="flex items-center">
                                <input type="checkbox"/>
                                <p className="ml-2">{value.firstname} {value.lastname}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default VotingSection;
