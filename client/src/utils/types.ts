
// Types
import React from "react";
import {CandidateObject} from "./mock-data.ts";

export type StringObject = Record<string, string>;
export type MixedObject = Record<string, string|number>;
export type LeaderboardObject = Record<string, string|CandidateObject[]>;
export type ResultsObject = Record<string, CandidateObject[]>;
export type NumberObject = Record<string, number>;
export type BooleanObject = Record<string, boolean>;
export type StringArrayObject = Record<string, string[]>;
export type ObjectArrayObject = Record<string, object[]>;
export type NumberArrayObject = Record<string, number[]>;
export type FormObject = Record<string, string|number|boolean|object|null|string[]|number[]|object[]>;

// DOM Events
export type ChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
export type ClickEvent = React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
export type SubmitEvent = React.MouseEvent<HTMLFormElement>
export type KeyDownEvent = React.KeyboardEvent<HTMLInputElement>