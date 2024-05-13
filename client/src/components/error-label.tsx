import {useState} from "react";

export const ErrorOptions = () => {
    const empty: Record<string, string> = {};
    const [errors, setErrors] = useState(empty);

    const validateErrors = (name: string) => {

        if(errors[name]) {
            const data = errors;
            delete data[name];
            setErrors(data);
        }
    }

    const getLabel = (name: string) => {
        return isVisible(name) && <ErrorLabel message={errors[name]} />;
    }

    const isVisible = (name: string) => {
        return Object.keys(errors).length > 0 && errors[name];
    }

    const getStyleResult = (name: string) => {
        return isVisible(name) ? 'border border-red-500' : 'outline-dark-blue';
    }


    return {errors, setErrors, validateErrors, getLabel, isVisible, getStyleResult};
}

type ErrorProps = {
    message?: string
}

const ErrorLabel = ({ message }: ErrorProps) => {
    return <label className="text-[12px] text-red-600 absolute left-3 top-[-9px] px-1.5 bg-white font-consolas rounded-md">{message}</label>
}

export default ErrorLabel;
