import {useContext, useEffect, useState} from "react";
import {candidateList, positions} from "../../../utils/mock-data.ts";
import Leaderboard from "./leaderboard.tsx";
import {FaCaretDown, FaCaretLeft, FaCaretRight} from "react-icons/fa";
import {format, getLogo} from "../../../utils/utils.ts";
import {NomineesObject} from "../../../utils/types.ts";
import {DEPARTMENTS, getId} from "../../../utils/data.ts";
import {DataContext} from "../../../utils/context.ts";

interface DashboardSummaryProp {
    type: string,
}

const DashboardSummary = ({ type }: DashboardSummaryProp) => {

    const isExecutive = type === "executive";
    const { nominees, voters } = useContext(DataContext);
    const [index, setIndex] = useState(0);
    const [dropdown, setDropdown] = useState(false);
    const [department, setDepartment] = useState(type === "executive" ? type : 'ap');
    const totalPositions = 4;
    const position = positions(type)[index];
    const position2 = positions(type)[index+1];
    const logo = getLogo(department);
    const first: NomineesObject = candidateList(type, nominees, isExecutive ? undefined : department).filter(value => value.position === position);
    const second: NomineesObject = candidateList(type, nominees, isExecutive ? undefined : department).filter(value => value.position === position2);

    useEffect(() => {


        function handleEvent(e: MouseEvent) {
            const target = e.target;
            if(target) {
                const id = getId(target);
                if(id !== "dropdown" && dropdown) {
                    setDropdown(false);
                }
            }
        }

        window.addEventListener('click', handleEvent);

        return () => {
            window.removeEventListener('click', handleEvent);
        }
    }, [dropdown]);

    const next = () => {
        if (index < totalPositions - 2) setIndex(index + 1);
    }

    const previous = () => {
        if (index > 0) setIndex(index - 1);
    }

    const getTotal = (): number => {
        if(type === "local") return voters.filter(value => value.department === department.toUpperCase()).length;
        return voters.length;
    }

    return (
        <div className="w-full pt-4 px-3 flex flex-col select-none">
            <div className="flex items-center mb-4">
                <img src={logo + ""} alt="" className="w-16 h-16 mr-2"/>
                <h1 className="text-2xl font-bold mb-1.5">{format(type)} {type === "executive" ? "Council" : "Department"}</h1>
                {type === "local" && (
                    <div id="dropdown" className="ml-20 relative">
                        <button
                            id="dropdown"
                            onClick={() => setDropdown(!dropdown)}
                            className="font-bold border py-1.5 w-[100px] cursor-pointer text-white relative bg-dark-blue">
                            {department.toUpperCase()} <FaCaretDown id="dropdown" className="absolute right-1.5 top-2.5"/></button>
                        <div id="dropdown" className={`w-full absolute border bg-white z-10 ${dropdown ? 'flex flex-col' : 'hidden'}`}>
                            {Object.keys(DEPARTMENTS).filter((value) => value.toLowerCase() !== department).map((value, key) => {
                                return <button key={key} className="hover:bg-gray-400" onClick={() => setDepartment(value.toLowerCase())}>{value}</button>
                            })}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex relative">
                <Leaderboard position={position} data={first} limit={2} total={getTotal()}/>
                <Leaderboard position={position2} data={second} limit={2} total={getTotal()}/>
                {/*<FaCaretLeft onClick={previous} className={`absolute left-0 top-[108px] text-[30px] cursor-pointer ${index === 0 ? 'pointer-events-none text-dark-blue/60' : 'text-dark-blue'}`}/>*/}
                {/*<FaCaretRight onClick={next} className={`absolute right-0 top-[108px] text-[30px] cursor-pointer text-dark-blue ${index === totalPositions - 2 ? 'pointer-events-none text-dark-blue/60' : 'text-dark-blue'}`}/>*/}
            </div>
            <div className="flex items-center self-center">
                <FaCaretLeft onClick={previous} className={`text-[30px] cursor-pointer ${index === 0 ? 'pointer-events-none text-dark-blue/60' : 'text-dark-blue'}`}/>
                <FaCaretRight onClick={next} className={`text-[30px] cursor-pointer text-dark-blue ${index === totalPositions - 2 ? 'pointer-events-none text-dark-blue/60' : 'text-dark-blue'}`}/>
            </div>
        </div>
    )
}
export default DashboardSummary;
