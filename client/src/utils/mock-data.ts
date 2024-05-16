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

// const candidate = (uid: number, firstname: string, lastname: string, votes: number): CandidateObject => {
//     return {uid, firstname, lastname, votes}
// }

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

// export const candidateList = (type: string): Record<string, CandidateObject[]> => {
//     const data: Record<string, Record<string, CandidateObject[]>> = {
//         executive: {
//             president: [
//                 candidate(1, "Johnny", "Sins", 180),
//                 candidate(2, "Alex", "Guduyo", 22)
//             ],
//             "vice-president": [
//                 candidate(3, "Allan", "Rubilla", 26),
//                 candidate(4, "Johnny", "Smith", 30),
//             ],
//             secretary: [
//                 candidate(5, "John", "Arpon", 60),
//                 candidate(6, "Tee", "Calo", 32)
//             ],
//             treasurer: [
//                 candidate(7, "Chayle", "Famador", 40),
//                 candidate(8, "Charles", "Anoc", 22)
//             ],
//         },
//         local: {
//             governor: [
//                 candidate(9, "Emily", "Pantin", 31),
//                 candidate(10, "Ralph", "Guduyo", 118),
//             ],
//             "vice-governor": [
//                 candidate(11, "Liza", "Balladares", 71),
//                 candidate(12, "Kathryn", "Villahermosa", 29),
//             ],
//             treasurer: [
//                 candidate(13, "Nonoy", "Revillame", 40),
//                 candidate(14, "Andrea", "Bacog", 22)
//             ],
//             auditor: [
//                 candidate(15, "Joshua", "Bas", 40),
//                 candidate(16, "Dominic", "Bomediano", 22)
//             ],
//         }
//     }
//
//     return data[type];
// }