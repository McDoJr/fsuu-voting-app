import {authData} from "../hooks/auth-hooks.ts";
import {Navigate, Outlet} from "react-router-dom";

interface PrivateRoutesProps {
    condition?: boolean | null
}

const PrivateRoutes = ({ condition = null}: PrivateRoutesProps) => {

    const result = condition == null ? authData().loggedIn() : condition;

    return result ? <Outlet /> : <Navigate to="/" />
}
export default PrivateRoutes;
