import {createContext, Dispatch, SetStateAction} from "react";
import {NomineesObject} from "./types.ts";

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
    saveData: (data: DataContextObject) => void,
    handleLogout: () => void,
    nominees: NomineesObject,
    updateNominees: () => void,
    fetchVoters: () => void,
    voters: Record<string, string>[],
    history: Record<string, string|number>[],
    fetchHistory: () => void,
    notification: number,
    setNotification: Dispatch<SetStateAction<number>>,
}

export const DataContext = createContext<DataContextType>({
    isLoggedIn: false,
    user: {},
    setUser: () => {},
    saveData: () => {},
    handleLogout: () => {},
    nominees: [],
    updateNominees: () => {},
    fetchVoters: () => {},
    voters: [],
    history: [],
    fetchHistory: () => {},
    notification: 0,
    setNotification: () => {}
});