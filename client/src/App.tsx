import {DataContext} from "./utils/context.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SigninPage from "./pages/auth/signin-page.tsx";
import SignupPage from "./pages/auth/signup-page.tsx";
import PrivateRoutes from "./security/private-routes.tsx";
import OtpPage from "./pages/auth/otp-page.tsx";
import DashboardPage from "./pages/admin/dashboard/dashboard-page.tsx";
import ResultsPage from "./pages/admin/results/results-page.tsx";

const App = () => {

    return (
        <DataContext.Provider value={null}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<SigninPage/>} />
                    <Route path="/signin" element={<SigninPage/>} />
                    <Route path="/signup" element={<SignupPage/>} />
                    <Route path="/signup/otp" element={<OtpPage />} />
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
