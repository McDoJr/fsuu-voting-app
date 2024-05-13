import {ResultsObject} from "../../../utils/types.ts";
import {FaAnglesDown, FaAnglesUp} from "react-icons/fa6";
import {format} from "../../../utils/utils.ts";
import {useState} from "react";

interface ResultSheetProps {
    title: string,
    data: ResultsObject
}

const ResultSheet = ({ title, data }: ResultSheetProps) => {

    const [dropdown, setDropdown] = useState(false);

    const toggleDropdown = () => {
        setDropdown(!dropdown);
    }

    return (
        <div className={`w-[80%] flex flex-col mx-auto border-t pb-3 ${dropdown ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="flex items-center hover:bg-gray-400 bg-gray-300 py-1.5 px-3 relative cursor-pointer" onClick={toggleDropdown}>
                <h1 className="font-bold">{title}</h1>
                {dropdown ? <FaAnglesUp className="absolute left-[50%] translate-x-[-50%] text-dark-blue"/> : <FaAnglesDown className="absolute left-[50%] translate-x-[-50%] text-dark-blue"/>}
            </div>
            {Object.keys(data).map((value, index) => {
                return (
                    <div key={index} className={`w-[60%] mx-auto font-poppins ${dropdown ? 'flex flex-col mt-3' : 'hidden'}`}>
                        <h1 className="text-center font-bold">{format(value)} Position</h1>
                        <div className="flex items-center">
                            <h1 className="mr-8">Representatives :</h1>
                            <div>
                                {data[value].map((item, i) => {
                                    return (
                                        <p className={`${i === 0 ? 'text-dark-blue font-[600]' : ''}`} key={i}>{item.firstname} {item.lastname} - {item.votes} Votes</p>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default ResultSheet;
