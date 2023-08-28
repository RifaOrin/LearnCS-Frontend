import { useState } from "react";
import Background from "./images/background.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Url = "http://127.0.0.1:8000/auth/users/reset_password/";
function ResetPass() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const resetdata = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const resp = await axios.post(Url, { email });
            navigate("/resetPassConfirmation");
            
        } catch (error) {
            if (error.response.data.email !== undefined) {
                alert(error.response.data.email);
            }
        }
    };
    return (
        <body>
            <section className="bg-[#5E6055] min-h-screen flex items-center justify-center">
                {/*--login container*/}
                <div className="bg-[#1E2124] flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    {/*form */}
                    <div className="md:w-1/2 px-16">
                        <h2 className="font-bold text-[#f3f7fa] text-2xl">
                            Reset Password
                        </h2>
                        <p className="text-[#f3f7fa] text-sm mt-4">
                            Enter your email for Reset Password
                        </p>

                        <form className="flex flex-col gap-4">
                            <input
                                className="p-2 mt-8 rounded-xl border outline-none focus:border-2 focus:border-[#5E6055] bg-[#f3f7fa]"
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <button
                                className="bg-[#9D9477] rounded-xl text-[#1E2124] font-semibold py-2 hover:scale-105 duration-300"
                                onClick={resetdata}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                    {/*image */}
                    <div className="md:block hidden w-1/2">
                        <img src={Background} className=" rounded-2xl"></img>
                    </div>
                </div>
            </section>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-sm mx-auto shadow-lg">
                        <p className="text-center text-lg text-gray-800 font-semibold mb-4">
                            Please check your email .
                        </p>
                        <button
                            className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
        </div>
      )}
        </body>
    );
}

export default ResetPass;
