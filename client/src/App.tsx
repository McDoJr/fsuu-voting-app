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
import {convertData} from "./utils/data.ts";

const App = () => {

    const [user, setUser] = useState({
        student_id: "",
        firstname: "",
        lastname: "",
        course: "",
        year: "",
        department: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        const data = localStorage.getItem("user");
        if(data) {
            const userData = convertData(JSON.parse(data));
            saveData(userData);
            console.log("Data has been fetched!")
            let lastUpdated = localStorage.getItem("lastUpdated");
            if(lastUpdated) {
                lastUpdated = JSON.parse(lastUpdated); // Delete user data after some time of inactivity

            }
        }
    }, []);

    const saveData = (data: DataContextObject) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("lastUpdated", JSON.stringify(new Date()))
    }

    const isLoggedIn = localStorage.getItem("user") != null || Object.values(user).every(value => value);

    console.log(user)

    return (
        <DataContext.Provider value={{isLoggedIn, user, setUser, saveData}}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<SigninPage/>} />
                    <Route path="/signin" element={<SigninPage/>} />
                    <Route path="/signup" element={<SignupPage/>} />
                    // Create a new private route
                    <Route path="/signup/otp" element={<OtpPage />} />
                    <Route element={<PrivateRoutes condition={isLoggedIn} />}>
                        <Route path="/vote" element={<VotingPage />} />
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/admin/dashboard" element={<DashboardPage/>} />
                        <Route path="/admin/results" element={<ResultsPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </DataContext.Provider>
    )
}
export default App;
