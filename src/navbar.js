import Logo from "./images/default1.png";
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { logOut } from "ionicons/icons";
const Userurl = "https://kasifzisan.pythonanywhere.com/auth/users/me/";
const baseUrl = `https://kasifzisan.pythonanywhere.com/user/`;


function Navbar(){
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [username, setUsername] = useState("");
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [profile_picture, setProfilePicture] = useState("");
    const toggleSearchbar = () => {
        setShowSearchbar(!showSearchbar);
    };
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };
    const isLoggedIn =!! userid;
    const Access = localStorage.accessToken;

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setUserid("");
        navigate("/");
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

    return(
        <nav className="bg-[#00242C] p-4 flex items-center justify-between">
            <div className="flex items-center">
            <Link to = "/">
            <img src={Logo} className="w-40 cursor-pointer"></img>
            </Link>
            </div>
            <div className="flex-grow md:flex md:items-center md:w-1/2">
                <div className="relative flex items-center">
                <Link to={`/searchResult/${searchValue}`}>
                    <div className="grid place-items-center absolute right-2 md:left-12 top-1/2 transform -translate-y-1/2 h-full w-12 text-gray-300">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </Link>
                <input
                type="text"
                placeholder="Search for courses"
                id="search"
                className="hidden md:inline-block bg-[#012326] placeholder-white text-white border-2 outline-none rounded-sm py-2 px-4 ml-10 pl-14"
                value={searchValue}
                onChange={handleChange}
                />
                </div>
            
           
            </div>
            <div className="md:flex md:items-center">
                <Link to = "/courses" className="hidden lg:block text-white text-md font-semibold mr-4 hover:text-[#05F26C]">Explore Courses</Link>
                {isLoggedIn ? null : (
                        <>
                <Link to="/login" ><button className="hidden lg:block text-white text-md font-semibold mr-4 hover:text-[#05F26C]">Sign In</button></Link>
                <Link to = "/signup"><button className="text-[#012326] font-bold mr-4 outline-none px-5 py-2 rounded-sm bg-[#05F26C] hover:bg-[#07cc5c]">Sign Up</button></Link>
                </>
                )}
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
            </div>
            
        </nav>



    );
}
export default Navbar;