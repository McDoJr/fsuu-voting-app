import {NomineesObject} from "./types.ts";

export type CandidateObject = {
    uid: number
    firstname: string,
    lastname: string,
    votes: number
}

export const createCandidate = (uid: number, firstname: string, lastname: string, votes: number): CandidateObject => {
    return {uid, firstname, lastname, votes}
}

export const getCandidate = (candidate: string | CandidateObject): CandidateObject => {
    return <CandidateObject> candidate;
}

export const positions = (type: string) => {
    
    const positions: Record<string, string[]> = {
        executive: ['president', 'vice-president', 'secretary', 'treasurer'],
        local: ['governor', 'vice-governor', 'treasurer', 'auditor'],
    }

    return positions[type];
}

export const candidateList = (type: string, data: NomineesObject, department?: string): NomineesObject => {
    const list: NomineesObject = data.filter((value) => value.type === type);
    return department != undefined ? list.filter(value => value.department.toLowerCase() === department.toLowerCase()) : list;
}