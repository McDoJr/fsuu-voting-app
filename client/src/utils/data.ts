import {StringArrayObject} from "./types.ts";
import {DataContextObject} from "./context.ts";
import {CandidateObject, createCandidate} from "./mock-data.ts";

export const DEPARTMENTS: StringArrayObject = {
    AP: ['BSA'],
    ASP: ['BSAS'],
    BAP: ['BSBA'],
    CJEP: ['BSCRIM'],
    CSP: ['BSIT', 'BSCS', 'BSIT-CA', 'BLISS'],
    ETP: ['BSCE', 'BSCI'],
    NP: ['BSN'],
    TEP: ['BSEE', 'BSSE', 'DEPED'],
}

export const convertInputElement = (element: Element | JSX.Element) => {
    return <HTMLInputElement> element;
}

export const convertFormElement = (element: Element | JSX.Element) => {
    return <HTMLFormElement> element;
}

export const convertData = (data: object) => {
    return <DataContextObject> data;
}

export const COURSES = (department: string) => {
    return DEPARTMENTS[department];
}

export const getTimeDifference = (oldDate: Date) => {
    return (new Date().getTime() - oldDate.getTime()) / 1000;
}

export const getId = (element: EventTarget): string => {
    const result = <HTMLElement> element;
    return result.id;
}

export const sampleList = () => {
    const list: CandidateObject[] = [];
    for(let i = 0; i < 2; i++) {
        list.push(createCandidate(i, "N", "A", 0));
    }

    return list;
}

export const getGridLabel = (total: number) => {
    let list = [];
    if(total <= 5) {
        for(let i = 0; i <= total; i++) {
            list.push(i);
        }
    }else {
        list = [0, total/2, total];
    }
    return list;
}

export const HOST = "http://localhost:8081";