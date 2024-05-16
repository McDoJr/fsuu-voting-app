import {VoteRecordObject} from "../../../utils/types.ts";
import {format, getLogo} from "../../../utils/utils.ts";
import {useContext, useState} from "react";
import {DataContext} from "../../../utils/context.ts";
import {candidateList, positions} from "../../../utils/mock-data.ts";
import {FaPenToSquare} from "react-icons/fa6";
import Button from "../../../components/button.tsx";
import {convertInputElement} from "../../../utils/data.ts";

interface ConfirmationSectionProps {
    type: string,
    data: VoteRecordObject,
    handleChange: (type: string, position: string, uid: number) => void
}

const ConfirmationSection = ({ type, data, handleChange }: ConfirmationSectionProps) => {
    const { user, nominees } = useContext(DataContext);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [selectedUid, setSelectedUid] = useState(0);
    const isExecutive = type === "executive";

    const department = isExecutive ? undefined : user.department;
    // console.log(nominees);
    const candidates = candidateList(type, nominees, department);


    const logo = getLogo(isExecutive ? type : user.department);

    const onChange = (uid: number) => {
        const children = document.getElementById(selectedPosition)!.getElementsByTagName("INPUT");
        for(let i = 0; i < children.length; i++) {
            const input = convertInputElement(children[i]);
            input.checked = input.id === uid.toString();
        }
        setSelectedUid(uid);
    }

    const handleSave = () => {
        const uid = selectedUid === 0 ? data[selectedPosition] : selectedUid;
        handleChange(type, selectedPosition, uid);
        setSelectedPosition('')
        setSelectedUid(0);
    }

    const getEditPopup = () => {

        return (
            <section className="w-full h-screen absolute left-0 top-0 flex justify-center items-center bg-black/80">
                <div className="flex flex-col items-center mb-16 bg-white py-8 px-16 border-4 border-dark-blue">
                    <h3 className="text-2xl font-[600]">{format(selectedPosition)} Position</h3>
                    <div className="flex flex-wrap my-6" id={selectedPosition}>
                        {candidates.filter(value => value.position === selectedPosition).map((value, index) => {

                            const checked = selectedUid === 0 ? data[selectedPosition] === value.uid : value.uid === selectedUid;

                            return (
                                <div key={index} className="flex flex-col items-center mx-6">
                                    <img src={require('@assets/user.png')} alt="" className="w-24"/>
                                    <div className="flex items-center mt-2">
                                        <input type="checkbox" checked={checked} className="cursor-pointer" id={value.uid + ""}
                                               onChange={() => onChange(value.uid)}/>
                                        <p className="ml-2">{value.firstname} {value.lastname}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <Button type="button" className="self-center" onClick={handleSave}>SAVE</Button>
                </div>
            </section>
        )
    }

    return (
        <section className="w-[50%] flex flex-col items-center font-poppins py-8">
            <div className="flex items-center justify-center mb-6">
                <img src={logo + ""} alt="" className="w-[58px] mr-4"/>
                <h1 className="text-3xl font-bold">{isExecutive ? "Executive Council" : "Local Department"}</h1>
            </div>
            {nominees.length > 0 && positions(type).map((position, index) => {
                const uid = data[position];
                const candidate = candidates.filter(value => value.position === position).find(value => value.uid == uid);
                // const candidate = getCandidate(temp!);
                return (
                    <div className="flex flex-col items-center mb-6" key={index}>
                        <h1 className="text-2xl font-[600]">{format(position)} Position</h1>
                        <p className="text-dark-blue mt-3 font-[500] flex items-center">{candidate!.firstname || ""} {candidate!.lastname || ""}
                            <FaPenToSquare className="ml-3 mb-1 cursor-pointer" onClick={() => setSelectedPosition(position)}/></p>
                    </div>
                )
            })}
            {selectedPosition && getEditPopup()}
        </section>
    )
}
export default ConfirmationSection;
