import "./tailwindcss/input.css";
import Logo from "./images/default1.png";
import video from "./images/course-video.mp4";
import { useState } from "react";
import Searchbar from "./searchbar";
import Signup from "./signup";
import Courses from "./courses";
import Footer from "./footer";
import Chaticon from "./chatIcon";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


import { IonIcon } from "@ionic/react";
import { chatbubbles, logOut } from "ionicons/icons";
const Userurl = "https://kasifzisan.pythonanywhere.com/auth/users/me/";
const baseUrl = `https://kasifzisan.pythonanywhere.com/user/`;

function LandingPage() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [username, setUsername] = useState("");
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [profile_picture, setProfilePicture] = useState("");
    const toggleSearchbar = () => {
        setShowSearchbar(!showSearchbar);
    };
    const isLoggedIn =!! userid;
    const Access = localStorage.accessToken;

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setUserid("");
        window.location.reload();
    };

    const userInitials = () => {
        if (username) {
            const initials = username
                .split(" ")
                .map((name) => name.charAt(0))
                .join("")
                .toUpperCase();
            return initials;
        }
        return ""; // Return an empty string if username is not available
    };

    useEffect(() =>{
        if (Access != undefined) {
            axios
                .get(Userurl, {
                    headers: {
                        Authorization: `JWT ${Access}`,
                    },
                })
                .then((response) => {
                    setUserid(response.data.id);
                    axios
                    .get(baseUrl + response.data.id, {
                        headers: {
                            Authorization: `JWT ${Access}`,
                        },
                    })
                    .then((response) => {
                        setProfilePicture(response.data.profile_picture);
                        setUsername(response.data.username);
                    })
                    .catch((error) => {
                        if (
                            error.message ===
                            "Request failed with status code 401"
                        ) {
                            navigate("/login");
                        }
                    });
                })
                .catch((error) => {
                    if (
                        error.message === "Request failed with status code 401"
                    ) {
                        navigate("/login");
                    }
                });
        }
    }, [Access, navigate])
    return (
        <body>
            <div className=" h-21  bg-[#00242cc9] pl-16 pr-10 py-0.25 absolute z-20">
                <nav className=" flex items-center justify-between">
                    
                    <img src={Logo} className="w-1/6 h-21 cursor-pointer"></img>
                    
                    <ul className="flex-1 text-right">
                        <li className="list-none inline-block px-5">
                            <Link
                                to="/"
                                className="no-underline text-[#F2F2F2] text-lg font-semibold px-3 py-3 hover:border-2 hover:scale-105 duration-250 cursor-pointer"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="list-none inline-block px-5">
                            <Link
                                to=""
                                className="no-underline text-[#F2F2F2] text-lg font-semibold px-3 py-3 hover:border-2 hover:scale-105 duration-250 cursor-pointer"
                            >
                                About Us
                            </Link>
                        </li>
                        <li className="list-none inline-block px-5">
                            <Link
                                to="./contact"
                                className="no-underline text-[#F2F2F2] text-lg font-semibold px-3 py-3 hover:border-2 hover:scale-105 duration-250 cursor-pointer"
                            >
                                Contact
                            </Link>
                        </li>
                        {isLoggedIn ? null : (
                        <>
                            <li className="list-none inline-block px-5">
                                <Link to="./login">
                                    <button
                                        type="button"
                                        className="text-[#7ED98B] hover:text-[#498C60] inline-block text-lg font-semibold px-3 py-3"
                                    >
                                        Log In
                                    </button>
                                </Link>
                            </li>
                            <li className="list-none inline-block px-5">
                                <Link to="./signup">
                                    <button
                                        type="button"
                                        className="text-[#7ED98B] hover:text-[#498C60] inline-block text-lg font-semibold px-3 py-3"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </li>
                        </>
                    )}
                        
                    </ul>
                    <Searchbar/>
                    {profile_picture ? (
                <Link to="/profile">
                    <img
                        src={profile_picture}
                        alt="Profile"
                        className="w-10 h-10 rounded-full cursor-pointer ml-4 mr-4"
                    />
                </Link>
            ) : (
                isLoggedIn && (
                <div className="w-10 h-10 rounded-full cursor-pointer ml-4 mr-4 flex items-center justify-center bg-gray-300">
                    {/* Display the user's username initials */}
                    <Link to="/profile">
                    <span className="text-gray-700 text-lg font-semibold">
                        {userInitials()}
                    </span>
                    </Link>
                </div>
                )
            )}
                {isLoggedIn && (
                            <div className="ml-4 mt-2">
                                <button
                                    onClick={handleLogout}
                                    className="hidden lg:block text-white mr-4 hover:text-[#05F26C]"
                                >
                                    <IonIcon icon={logOut} className="text-3xl"></IonIcon>
                                </button>
                            </div>
                        )}
                    
                </nav>
            </div>

            <section
                className="showcase right-0 w-full min-h-screen p-20 flex 
            justify-between items-center z-10 transition duration-1000 text-[#F2F2F2]"
            >
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
                    src={video}
                    autoPlay
                    loop
                    muted
                />
                <div className="overlay absolute top-0 left-0 w-full h-full bg-overlay blend-screen"></div>

                <div className="text relative">
                    <h2 className="text-4xl xl:text-5xl  my-5 font-extrabold uppercase 2xl:text-5xl">
                        Unlock the world of CS
                    </h2>
                    <h3 className="text-3xl xl:text-4xl my-5 font-bold max-w-2xl 2xl:text-4xl">
                        Knowledge with LearnCS
                    </h3>
                    <p className="max-w-2xl my-5 text-base xl:text-lg font-normal leading-7 text-justify">
                        Discover a world of endless possibilities in the realm
                        of Computer Science, as LearnCS empowers you to master
                        new skills, broaden your horizons, and unleash your
                        potential.
                    </p>
                    <Link to = "./courses">
                    <button
                        type="button"
                        className="text-xl font-bold inline-block bg-[#F2F2F2] text-[#498C60] py-2.5 px-6 mt-2.5 border-2
                  rounded
                   uppercase tracking-wider
                  hover:tracking-widest transition duration-200 ease-in-out"
                    >
                        Explore courses
                    </button>
                    </Link>
                </div>
            </section>
            {isLoggedIn && (
            <Chaticon/>
            )}
            
            <Courses />
            {isLoggedIn ? null : (
            <Signup />
            )}
            <Footer />
            
            
        </body>
    );
}
export default LandingPage;
