import {StringArrayObject} from "./types.ts";

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

export const HOST = "http://localhost:8081";