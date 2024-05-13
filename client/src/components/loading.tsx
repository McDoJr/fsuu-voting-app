import {useState} from "react";

const Loading = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/95">
            <div className="loader"></div>
        </div>
    )
}

export const LoadingOptions = () => {

    const [loading, setLoading] = useState(false);

    const closeLoading = () => {
        setLoading(false);
    }

    const viewLoading = () => {
        setLoading(true);
    }

    const loadingStatus = () => {
        return loading && <Loading/>
    }

    return { viewLoading, closeLoading, loadingStatus };

}

export default Loading;
