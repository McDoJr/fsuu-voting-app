import {createContext, Dispatch, SetStateAction} from "react";

export interface DataContextObject {
    student_id: string,
    firstname: string,
    lastname: string,
    course: string,
    year: string,
    department: string,
    email: string,
    password: string
}

type DataContextType = {
    isLoggedIn: boolean
    user: Record<string, string>,
    setUser: Dispatch<SetStateAction<DataContextObject>>,
    saveData: (data: DataContextObject) => void
}

export const DataContext = createContext<DataContextType>({
    isLoggedIn: false,
    user: {},
    setUser: () => {},
    saveData: () => {}
});