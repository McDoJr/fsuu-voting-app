import {StringArrayObject} from "./types.ts";

export const DEPARTMENTS: StringArrayObject = {
    CSP: ['BSIT', 'BSCS', 'BSIT-CA', 'BLISS'],
    ASP: ['BSAS'],
    TEP: ['BSEE', 'BSSE', 'DEPED'],
    ETP: ['BSCE', 'BSCI'],
    NP: ['BSN'],
    CJEP: ['BSCRIM'],
    AP: ['BSA'],
    BAP: ['BSBA'],
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