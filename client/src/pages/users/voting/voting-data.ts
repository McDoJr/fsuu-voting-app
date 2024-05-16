import {useState} from "react";
import {NomineesObject, VoteRecordObject} from "../../../utils/types.ts";
import {candidateList, positions} from "../../../utils/mock-data.ts";

export const VotingData = (type: string, nominees: NomineesObject, department?: string) => {

    const dept = type === "executive" ? undefined : department;

    const records = candidateList(type, nominees, dept);

    const [formData, setFormData] = useState<VoteRecordObject>(() => {

        const form: VoteRecordObject = {};

        for(const position of positions("executive")) {
            form[position] = 0;
        }

        return form;
    });

    const refreshForm = () => {
        setFormData({});
        const elements = document.getElementById("vote__form")!.getElementsByTagName("INPUT");
        for(let i = 0; i < elements.length; i++) {
            const element = <HTMLInputElement> elements[i];
            element.checked = false;
        }
        window.scroll({top: 0});
    }

    const handleChange = (uid: number, position: string) => {
        const children = document.getElementById(position)!.getElementsByTagName("INPUT");
        for(let i = 0; i < children.length; i++) {
            const input = <HTMLInputElement> children[i];
            input.checked = input.id === uid.toString();
        }
        setFormData({...formData, [position]: uid});
    }

    return { records, handleChange, formData, refreshForm };
}