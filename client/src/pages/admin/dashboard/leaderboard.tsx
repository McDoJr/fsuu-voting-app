import {NomineesObject} from "../../../utils/types.ts";
import {CandidateObject, createCandidate} from "../../../utils/mock-data.ts";
import {format} from "../../../utils/utils.ts";
import {getGridLabel, sampleList} from "../../../utils/data.ts";

interface LeaderboardProps {
    position: string,
    data: NomineesObject,
    limit: number,
    total: number
}

const Leaderboard = ({ position, data, limit, total }: LeaderboardProps) => {

    const getPercentage = (amount: number) => {
        return parseInt(((100 * amount) / total).toString());
    }

    const list = data.length === 0 ? sampleList() : data;
    if(list.length === 1) {
        list.push(createCandidate(1, "N", "A", 0));
    }

    list.sort((a, b) => b.votes - a.votes);

    const getProgressBar = (candidate: CandidateObject, index: number) => {

        const votes = candidate.votes;

        return (
            <div className="w-[240px] h-[40px] bg-gray-200 relative text-[14px] font-[500] text-center leading-[40px]">
                <span>{votes} {votes === 1 ? 'Vote' : 'Votes'}</span>
                <div className={`absolute left-0 top-0 h-full overflow-hidden ${candidate.votes === 0 ? 'opacity-0' : ''}`}
                     style={{width: `${getPercentage(parseInt(votes + ""))}%`}}>
                    <div
                        className="absolute left-0 top-0 h-full w-[240px] bg-dark-blue text-[14px] text-white">{votes} {votes === 1 ? 'Vote' : 'Votes'}
                    </div>
                </div>
                {index === 1 && (
                    <div className="flex justify-between">
                        {getGridLabel(total).map((value, index) => {
                            return <p key={index}>{value}</p>
                        })}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="flex flex-col w-[50%] select-none">
            <h2 className="text-[18px] font-bold mb-3 self-center">{format(position + "").toUpperCase()}</h2>
            {list.map((candidate, index) => {
                return (
                    <div className={`flex self-center ${index < limit - 1 ? "mb-6" : ""} ${index < limit ? "" : "hidden"}`} key={index}>
                        <p className="w-[150px] font-[500] text-[14px] text-center flex flex-wrap justify-center items-center">{candidate.firstname} {candidate.lastname}</p>
                        {getProgressBar(candidate, index)}
                    </div>
                )
            })}
        </div>
    )
}
export default Leaderboard;
