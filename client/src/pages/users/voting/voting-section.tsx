import {NomineesObject} from "../../../utils/types.ts";
import {format} from "../../../utils/utils.ts";

interface VotingSectionProps {
    position: string,
    data: NomineesObject,
    handleChange: (uid: number, position: string) => void
}

const VotingSection = ({ position, data, handleChange }: VotingSectionProps) => {
    return (
        <div className="w-full flex flex-col items-center mb-16">
            <h3 className="self-start text-2xl font-[600]">{format(position)} Position</h3>
            <div className="flex flex-wrap mt-6" id={position}>
                {data.filter(value => value.position === position).map((value, index) => {
                    return (
                        <div key={index} className="flex flex-col items-center mx-6">
                            <img src={require('@assets/user.png')} alt="" className="w-24"/>
                            <div className="flex items-center mt-2">
                                <input type="checkbox" className="cursor-pointer" id={value.uid + ""} onChange={() => handleChange(value.uid, position)}/>
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
