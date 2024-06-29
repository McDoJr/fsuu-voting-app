
// Types
import React from "react";
import {CandidateObject} from "./mock-data.ts";

export interface VotingForm {
    executive: Record<string, ExecutiveVotingForm[]>,
    local: Record<string, LocalVotingForm[]>
}

export interface ExecutiveVotingForm {
    type: string,
    position: string,
    uid: number
    firstname: string,
    lastname: string,
    voted: boolean
}

export interface LocalVotingForm {
    type: string,
    department: string,
    position: string,
    uid: number
    firstname: string,
    lastname: string,
    voted: boolean
}

export interface NomineesForm {
    uid: number,
    firstname: string,
    lastname: string,
    student_id: string,
    type: string,
    position: string,
    department: string,
    year: string,
    votes: number
}

export interface GoogleInfo {
    given_name: string,
    family_name: string,
    email: string,
    picture: string
}

export type NomineesObject = NomineesForm[]
export type StringObject = Record<string, string>;
export type UserObject = Record<string, string>;
export type VoteRecordObject = Record<string, number>
export type AllRecordObject = Record<string, VoteRecordObject>
export type LeaderboardObject = Record<string, string|CandidateObject[]>;
export type ResultsObject = Record<string, CandidateObject[]>;
export type ExecutiveVotingObject = Record<string, ExecutiveVotingForm[]>;
export type LocalVotingObject = Record<string, LocalVotingForm[]>;
// export type VotingObject = Record<string, ExecutiveVotingObject | LocalVotingObject>
export type VotingObject = VotingForm;
export type NumberObject = Record<string, number>;
export type BooleanObject = Record<string, boolean>;
export type StringArrayObject = Record<string, string[]>;
export type ObjectArrayObject = Record<string, object[]>;
export type NumberArrayObject = Record<string, number[]>;
export type FormObject = Record<string, string|number|boolean|object|null|string[]|number[]|object[]>;

// DOM Events
export type ChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
export type ClickEvent = React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
export type SubmitEvent = React.MouseEvent<HTMLFormElement>
export type KeyDownEvent = React.KeyboardEvent<HTMLInputElement>