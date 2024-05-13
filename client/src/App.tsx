import {DataContext} from "./utils/context.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SigninPage from "./pages/auth/signin-page.tsx";
import SignupPage from "./pages/auth/signup-page.tsx";
import PrivateRoutes from "./security/private-routes.tsx";
import OtpPage from "./pages/auth/otp-page.tsx";
import {authData} from "./hooks/auth-hooks.ts";
import DashboardPage from "./pages/admin/dashboard-page.tsx";

const App = () => {

    return (
        <DataContext.Provider value={null}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<SigninPage/>} />
                    <Route path="/signin" element={<SigninPage/>} />
                    <Route path="/signup" element={<SignupPage/>} />
                    <Route element={<PrivateRoutes condition={authData().isOtp()}/>}>
                        <Route path="/signup/otp" element={<OtpPage />} />
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/admin/dashboard" element={<DashboardPage/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </DataContext.Provider>
    )
}
export default App;
