import UserNavigation from "../user-navigation.tsx";
import {FaCircleCheck} from "react-icons/fa6";
import Button from "../../../components/button.tsx";
import {useContext, useEffect} from "react";
import {DataContext} from "../../../utils/context.ts";
import {setTitle} from "../../../utils/utils.ts";

const VotingSuccessPage = () => {

    const {handleLogout} = useContext(DataContext);

    useEffect(() => {
        setTitle('Vote Success');
    }, []);

    return (
        <section className="w-full min-h-screen flex flex-col font-poppins">
            <UserNavigation data={{}} link="/vote/success">
                <img src={require('@assets/fsuu_logo.png')} alt="" className="w-16 mr-3"/>
                <h1 className="text-3xl text-white font-[600] tracking-wider">FSUU VOTING SYSTEM</h1>
            </UserNavigation>
            <div className="self-center my-auto py-6 px-10 shadow-xl rounded-xl flex flex-col items-center">
                <FaCircleCheck className="text-4xl text-green-500 mb-4"/>
                <h1 className="font-prompt text-2xl">Your vote(s) has been</h1>
                <h1 className="font-prompt text-2xl">recorded</h1>
                <p className="font-prompt mt-6">Thank you for voting!</p>
                <Button type="button" onClick={handleLogout}>SIGN OUT</Button>
            </div>
        </section>
    )
}
export default VotingSuccessPage;
