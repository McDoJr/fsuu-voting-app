import OtpData from "./otp-data.ts";
import {FaArrowLeftLong} from "react-icons/fa6";

const OtpPage = () => {

    const { handleSubmit, onKeyDown, onChange, formData, sendToLandingPage, getView } = OtpData();

    return (
        <section className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="font-prompt font-bold text-dark-blue text-5xl mb-6 drop-shadow-lg">VERIFICATION</h1>
            <form action=""
                  onSubmit={handleSubmit}
                  className="py-6 px-16 rounded-md shadow-lg shadow-gray-700 flex flex-col items-center relative">
                <FaArrowLeftLong
                    onClick={sendToLandingPage}
                    className="absolute left-3 top-3 w-8 h-6 text-dark-blue cursor-pointer"/>
                <h1 className="text-3xl font-bold text-dark-blue mb-6">OTP</h1>
                <div>
                    {Object.keys(formData).map((key, index) => {
                        return <input type="text"
                                      className="w-8 h-8 text-[18px] border border-gray-400 text-center mx-1 outline-dark-blue rounded-[3px]"
                                      key={index}
                                      id={`${key}`}
                                      name={`${index}`}
                                      value={formData[index] + ""}
                                      onKeyDown={(e) => onKeyDown(e, index)}
                                      onChange={(e) => onChange(e, index)}
                        />
                    })}
                </div>
                <button
                    type="submit"
                    className={`py-2 px-10 mt-4 bg-dark-blue text-white font-[500] tracking-wider transition-all border-2 border-dark-blue hover:bg-white hover:text-dark-blue ${Object.values(formData).every(data => data) ? "" : "pointer-events-none bg-dark-blue/60 border-dark-blue/5"}`}>VERIFY
                </button>
            </form>
            {getView()}
        </section>
    )
}
export default OtpPage;
