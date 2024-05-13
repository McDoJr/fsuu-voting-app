import AdminContainer from "../admin-container.tsx";
import {currentDate, format} from "../../../utils/utils.ts";
import {candidateList} from "../../../utils/mock-data.ts";
import ResultSheet from "./result-sheet.tsx";
import {DEPARTMENTS} from "../../../utils/data.ts";

const ResultsPage = () => {

    const executives = candidateList("executive");

    return (
        <AdminContainer page="results">
            <section className="w-full h-full p-8 flex flex-col relative">
                <div className="flex flex-col items-center absolute top-8 right-8">
                    <img src={require('@assets/print.png')} alt="" className="w-8 cursor-pointer"/>
                    <p className="text-sm font-[500]">Print Results</p>
                </div>
                <div className="flex w-full mb-8">
                    <img src={require('@assets/fsuu_logo.png')} alt="" className="w-20"/>
                    <div className="flex flex-col ml-2">
                        <h1 className="text-3xl font-bold tracking-wider">Overall Results</h1>
                        <p className="font-[500]">{currentDate()}</p>
                    </div>
                </div>
                <ResultSheet title="Executive Council" data={executives} />
                {Object.keys(DEPARTMENTS).map((value, index) => {
                    return <ResultSheet key={index} title={`${format(value)} Program`} data={candidateList("local")} />
                })}
            </section>
        </AdminContainer>
    )
}
export default ResultsPage;
