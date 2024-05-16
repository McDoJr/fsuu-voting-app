import {authData} from "../hooks/auth-hooks.ts";
import {Navigate, Outlet} from "react-router-dom";

interface PrivateRoutesProps {
    condition?: boolean | null,
    link?: string
}

const PrivateRoutes = ({ condition = null, link = '/'}: PrivateRoutesProps) => {

    const result = condition == null ? authData().loggedIn() : condition;

    return result ? <Outlet /> : <Navigate to={link} />
}
export default PrivateRoutes;
