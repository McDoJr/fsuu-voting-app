import {useContext, useEffect} from "react";
import {setTitle} from "../../utils/utils.ts";
import {Link, useNavigate} from "react-router-dom";
import Button from "../../components/button.tsx";
import Password from "../../components/password.tsx";
import {SigninData} from "./signin-data.ts";
import {DataContext} from "../../utils/context.ts";
import {authData} from "../../hooks/auth-hooks.ts";

const SigninPage = () => {

    const {user} = useContext(DataContext);
    const navigate = useNavigate();
    const { handleSubmit, loadingStatus, handleChange, getView, getLabel, getStyleResult } = SigninData();

    useEffect(() => {
        setTitle("Sign In");
        if(authData().loggedIn()) {
            navigate('/admin/dashboard');
        }
        if(Object.values(user).every(value => value)) {
            navigate('/vote');
        }
        // history.replaceState({pathname: '/admin/dashboard'}, document.title);
    }, []);


    return (
        <section className="w-full h-svh flex flex-col justify-center items-center">
            <h1 className="font-prompt font-bold text-5xl text-dark-blue mb-6 drop-shadow-lg">FSUU VOTING SYSTEM</h1>
            <div className="flex rounded-md shadow-lg shadow-gray-700">
                <img src={require('@assets/signup.png')} alt="Image cartoon girl" className="w-[500px] scale-[1.2]"/>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center bg-white py-6 px-16 my-auto">
                    <img src={require('@assets/fsuu_logo.png')} alt="FSUU LOGO" className="w-24 mb-3"/>
                    <h1 className="text-3xl font-bold text-dark-blue mb-6">SIGN IN</h1>
                    <div className="w-full flex flex-col relative">
                        {getLabel('email')}
                        <input type="text" placeholder="GSuite Email" name="email"
                               onChange={handleChange}
                               className={`w-[220px] border border-gray-400 px-4 py-1.5 text-sm text-dark-blue rounded-md mb-3 outline-1 ${getStyleResult('email')}`}/>
                    </div>
                    <Password placeholder="Password" name="password" onChange={handleChange} >
                        {getLabel('password')}
                    </Password>
                    <Button />
                    <p className="text-sm mt-1">
                        Don't have an account?
                        <Link to="/signup" className="underline text-dark-blue ml-1.5">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
            {getView()}
            {loadingStatus()}
        </section>
    )
}
export default SigninPage;
