import {DataContext, DataContextObject} from "./utils/context.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SigninPage from "./pages/auth/signin-page.tsx";
import SignupPage from "./pages/auth/signup-page.tsx";
import PrivateRoutes from "./security/private-routes.tsx";
import OtpPage from "./pages/auth/otp-page.tsx";
import DashboardPage from "./pages/admin/dashboard/dashboard-page.tsx";
import ResultsPage from "./pages/admin/results/results-page.tsx";
import VotingPage from "./pages/users/voting/voting-page.tsx";
import {useEffect, useState} from "react";
import {convertData, HOST} from "./utils/data.ts";
import ConfirmationPage from "./pages/users/voting/confirmation-page.tsx";
import ProfilePage from "./pages/users/profile/profile-page.tsx";
import RegistrationPage from "./pages/admin/register/registration-page.tsx";
import axios from "axios";
import {NomineesObject} from "./utils/types.ts";
import VotingSuccessPage from "./pages/users/voting/voting-success-page.tsx";

const App = () => {

    const userForm = () => {
        return {
            student_id: "",
            firstname: "",
            lastname: "",
            course: "",
            year: "",
            department: "",
            email: "",
            password: ""
        }
    }

    const [nominees, setNominees] = useState<NomineesObject>([])
    const [voters, setVoters] = useState<Record<string, string>[]>([]);
    const [history, setHistory] = useState<Record<string, string|number>[]>([]);
    const [notification, setNotification] = useState(0);

    const [user, setUser] = useState(() => {
        let form = userForm();

        const data = localStorage.getItem("user");
        if(data) {
            form = convertData(JSON.parse(data));
            // return userData;
            // console.log("Data has been fetched!")
            // let lastUpdated = localStorage.getItem("lastUpdated");
            // if(lastUpdated) {
            //     lastUpdated = JSON.parse(lastUpdated); // Delete user data after some time of inactivity
            //
            // }
        }

        return form;
    });

    useEffect(() => {
        updateNominees();
        fetchVoters();
        fetchHistory();
        const notif = localStorage.getItem("notification");
        if(notif) setNotification(JSON.parse(notif));
    }, []);

    const fetchVoters = () => {
        axios.post(`${HOST}/api/admin/get/voters`)
            .then(res => {
                const {data, status} = res.data;
                if(status) {
                    setVoters(data);
                }
            }).catch(console.log);
    }

    const fetchHistory = () => {
        axios.post(`${HOST}/api/admin/get/history`)
            .then(res => {
                const {data, status} = res.data;
                if(status) {
                    setHistory(data);
                }
            }).catch(console.log);
    }

    const updateNominees = () => {
        axios.post(`${HOST}/api/admin/get/all`)
            .then(res => {
                const {data, status} = res.data;
                if(status) {
                    const list: NomineesObject = []
                    for(const value of data) {
                        const {uid, firstname, lastname, student_id, type, position, department, year, votes} = value;
                        list.push({uid: parseInt(uid), firstname, lastname, student_id, type, position, department, year, votes: parseInt(votes)});
                    }
                    setNominees(list);
                }
            })
            .catch(console.log);
    }

    const saveData = (data: DataContextObject) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("lastUpdated", JSON.stringify(new Date()))
    }

    const handleLogout = () => {
        setUser(userForm());
        localStorage.removeItem("user");
        localStorage.removeItem("lastUpdated");
    }

    const isLoggedIn = localStorage.getItem("user") != null || Object.values(user).every(value => value);

    return (
        <DataContext.Provider value={{isLoggedIn, user, setUser, saveData, handleLogout, nominees, updateNominees, fetchVoters, voters, history, fetchHistory, notification, setNotification}}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<SigninPage/>} />
                    <Route path="/signin" element={<SigninPage/>} />
                    <Route path="/signup" element={<SignupPage/>} />
                    // Create a new private route
                    <Route path="/signup/otp" element={<OtpPage />} />
                    <Route element={<PrivateRoutes condition={isLoggedIn} />}>
                        <Route path="/vote" element={<VotingPage />} />
                        <Route path="/vote/confirmation" element={<ConfirmationPage />} />
                        <Route path="/vote/success" element={<VotingSuccessPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/admin/dashboard" element={<DashboardPage/>} />
                        <Route path="/admin/registration" element={<RegistrationPage/>} />
                        <Route path="/admin/results" element={<ResultsPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </DataContext.Provider>
    )
}
export default App;
