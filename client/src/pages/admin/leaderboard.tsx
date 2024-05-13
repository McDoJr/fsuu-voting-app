import {LeaderboardObject} from "../../utils/types.ts";
import {CandidateObject, getCandidate} from "../../utils/mock-data.ts";
import {format} from "../../utils/utils.ts";

interface LeaderboardProps {
    data: LeaderboardObject,
    limit: number
}

const Leaderboard = ({ data, limit }: LeaderboardProps) => {

    const {position, candidates} = data;

    const getCandidates = (): CandidateObject[] => {
        const list: CandidateObject[] = [];
        for(let i = 0; i < limit; i++) {
            list.push(getCandidate(candidates[i]))
        }
        return list;
    }

    const getPercentage = (amount: number) => {
        return parseInt(((100 * amount) / 280).toString());
    }


    const getProgressBar = (candidate: CandidateObject, ranking: number) => {

        return (
            <div className="w-[240px] h-[50px] bg-gray-200 relative text-[18px] font-[500] text-center leading-[50px]">
                <span>{candidate.votes} Votes</span>
                {/*<span className="absolute left-2 top-0">#{ranking}</span>*/}
                <div className="absolute left-0 top-0 h-full overflow-hidden"
                     style={{width: `${getPercentage(parseInt(candidate.votes + ""))}%`}}>
                    <div
                        className="absolute left-0 top-0 h-full w-[240px] bg-dark-blue text-white">{candidate.votes} Votes
                        {/*<span className="absolute left-2 top-0">#{ranking}</span>*/}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-[50%] select-none">
            <h2 className="text-[22px] font-bold mb-3 self-center">{format(position + "").toUpperCase()}</h2>
            {getCandidates().map((candidate, index) => {
                return (
                    <div className={`flex self-center ${index < limit - 1 ? "mb-6" : ""}`} key={index}>
                        <p className="w-[150px] font-[500] text-center flex flex-wrap justify-center items-center">{candidate.firstname} {candidate.lastname}</p>
                        {getProgressBar(candidate, index + 1)}
                    </div>
                )
            })}
        </div>
    )
}
export default Leaderboard;
