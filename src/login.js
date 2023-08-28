import { useState } from "react";
import Background from "./images/background.jpg";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Url = "http://127.0.0.1:8000/auth/jwt/create/";
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const logindata = (e) => {
        e.preventDefault();
        axios
            .post(Url, {
                email,
                password,
            })
            .then((response) => {
                console.log(response.data);
                window.localStorage.setItem(
                    "accessToken",
                    response.data.access
                );
                navigate("/");
            })
            .catch((error) => {
                if (error.message === "Request failed with status code 401") {
                    alert("Please Input Your Credentials Correctly");
                }
            });
    };
    return (
        <body>
            <section className="bg-[#5E6055] min-h-screen flex items-center justify-center">
                {/*--login container*/}
                <div className="bg-[#1E2124] flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    {/*form */}
                    <div className="md:w-1/2 px-16">
                        <h2 className="font-bold text-[#f3f7fa] text-2xl">
                            Login
                        </h2>
                        <p className="text-[#f3f7fa] text-sm mt-4">
                            If you already a member, enter login details
                        </p>

                        <form className="flex flex-col gap-4">
                            <input
                                className="p-2 mt-8 rounded-xl border outline-none focus:border-2 focus:border-[#5E6055] bg-[#f3f7fa]"
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="relative">
                                <input
                                    className="p-2 rounded-xl border outline-none focus:border-2 focus:border-[#5E6055] w-full bg-[#f3f7fa] "
                                    type={showPassword ? "text" : "password"} // Toggle the input type
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="text-[#1E2124]"
                                    className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                    viewBox="0 0 16 16"
                                    onClick={togglePasswordVisibility}
                                >
                                    {/* Eye icon */}
                                    {showPassword ? (
                                        <g>
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </g>
                                    ) : null}

                                    {/* Cross icon */}
                                    {showPassword ? null : (
                                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    )}
                                </svg>
                            </div>
                            <button
                                className="bg-[#9D9477] rounded-xl text-[#1E2124] font-semibold py-2 hover:scale-105 duration-300"
                                onClick={logindata}
                            >
                                Login
                            </button>
                        </form>
                        <div className="mt-10 grid grid-cols-3 items-center text-gray-300">
                            <hr className="border-gray-400"></hr>
                            <p className="text-center text-sm cursor-pointer">
                                OR
                            </p>
                            <hr className="border-gray-400"></hr>
                        </div>
                        <Link to="/resetPassword">
                            <p className="mt-5 text-[#f3f7fa] text-xs underline cursor-pointer border-b border-gray-400 py-4">
                                Forgot your password?
                            </p>
                        </Link>
                        <div className="mt-3 text-xs flex justify-between items-center">
                            <p className="text-[#f3f7fa] cursor-pointer">
                                Don't Have An Account?
                            </p>
                            <Link
                                className="text-[#c7bfa7] hover:underline font-semibold hover:scale-105 duration-200"
                                to="/signup"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                    {/*image */}
                    <div className="md:block hidden w-1/2">
                        <img src={Background} className=" rounded-2xl"></img>
                    </div>
                </div>
            </section>
        </body>
    );
}

export default LoginPage;
