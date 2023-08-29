//import Profilepic from "./images/profilePhoto.jpg";
import { IonIcon } from "@ionic/react";
import Footer from "./footer";
import Navbar from "./navbar";
import Chaticon from "./chatIcon";
import {
    personOutline,
    paperPlaneOutline,
    schoolOutline,
    locationOutline,
    trashOutline,
} from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
const baseUrl = `https://kasifzisan.pythonanywhere.com/user/`;
const Userurl = "https://kasifzisan.pythonanywhere.com/auth/users/me/"
function Editprofile() {
    const { id } = useParams();
    const [userid, setUserid] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profile_picture, setProfilePicture] = useState("");
    const [university, setUniversity] = useState("");
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [location, setLocation] = useState("");
    const [about_me, setAbout] = useState("");
    const [isError, setIsError] = useState("");
    const navigate = useNavigate();
    const [short_description, setDescription] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [selectedProfilePicture, setSelectedProfilePicture] = useState(null); // New state for selected profile picture
    const [previewImage, setPreviewImage] = useState(null);
    const [isUpdatingProfilePicture, setIsUpdatingProfilePicture] = useState(false);
    const Access = localStorage.accessToken

    useEffect(() => {
        axios.get(Userurl,{
            headers: {
              'Authorization': `JWT ${Access}`
            }
            })
            .then((response) => {
                setUserid(response.data.id);
            })
            .catch((error) => {
                
                if (error.message === "Request failed with status code 401"){
                  
                    navigate('/login')
                  }
                
              });


        axios.get(baseUrl + id ,{
            headers: {
              'Authorization': `JWT ${Access}`
            }
            }).then((response) => {
            setUsername(response.data.username);
            setEmail(response.data.email);
            setProfilePicture(response.data.profile_picture);
            setUniversity(response.data.university);
            setFirstname(response.data.first_name);
            setLastname(response.data.last_name);
            setLocation(response.data.location);
            setAbout(response.data.about_me);
            setDescription(response.data.short_description);
        });
    }, []);

    const handleProfileImage = (e) => {
        const file = e.target.files[0];
        setSelectedProfilePicture(file);

        // Display preview of the selected image
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveAndExit = (e) => {
        e.preventDefault();

        const formdata = new FormData();

        formdata.append("first_name", first_name);
        formdata.append("last_name", last_name);
        formdata.append("profile_picture", selectedProfilePicture);
        formdata.append("email", email);
        formdata.append("university", university);
        formdata.append("location", location);
        formdata.append("about_me", about_me);
        formdata.append("username", username);
        formdata.append("short_description", short_description);
        axios({
            method: "put",
            url: baseUrl + id + "/",
            data: formdata,
            headers: { "Content-Type": "multipart/form-data",'Authorization': `JWT ${Access}` },
        })
            .then((response) => {
                console.log(response.data);
                navigate("/profile");
            })
            .catch((error) => setIsError(error.message));
    };

    return (
        <body className="bg-gray-100 min-h-screen">
            <Navbar/>
            <div className="sticky top-0 z-10 w-full h-20 border bg-gray-100 flex justify-end items-center space-x-2 pr-10 lg:pr-40">
                <Link to = "/profile">
                <button className="text-black text-sm font-semibold cursor-pointer">
                    Cancel
                </button>
                </Link>
                <button
                    className="text-black text-xs font-semibold px-3 py-2 cursor-pointer border rounded-md outline-none bg-[#05F26C] hover:bg-[#0dc55d]"
                    onClick={handleSaveAndExit}
                >
                    Save and Exit
                </button>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 pl-20 pr-20 pb-10">
                <div className="w-full md:w-2/4 flex flex-col space-y-8 border lg:ml-10 p-12 justify-center items-center">
                <div
                className="w-40 h-40 overflow-hidden rounded-full relative"
                onMouseEnter={() => setIsUpdatingProfilePicture(true)}
                onMouseLeave={() => setIsUpdatingProfilePicture(false)}
                onClick={() => setIsUpdatingProfilePicture(true)}
            >
                <img
                    src={previewImage || profile_picture}
                    className="object-cover w-full h-full"
                    alt="Profile"
                />
                {isUpdatingProfilePicture && (
                    <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-opacity-50 bg-black text-white text-lg">
                        Update Profile Picture
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfileImage}
                        />
                    </label>
                )}
            </div>
                    <div className="flex flex-col space-y-2">
                        <div className="relative">
                            <IonIcon
                                icon={personOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                type="text"
                                placeholder={first_name}
                                className="border-2 outline-none w-full focus:border-2 focus:border-green-500 rounded-sm py-2 px-3 pl-10 placeholder-black "
                                value={first_name}
                                onChange={(e) => setFirstname(e.target.value)}
                            ></input>
                        </div>
                        <div className="relative">
                            <IonIcon
                                icon={personOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                type="text"
                                placeholder={last_name}
                                className="border-2 outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3 pl-10 placeholder-black "
                                value={last_name}
                                onChange={(e) => setLastname(e.target.value)}
                            ></input>
                        </div>
                        <div className="relative">
                            <IonIcon
                                icon={paperPlaneOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                type="text"
                                placeholder={email}
                                className="border-2 outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3 pl-10 placeholder-black "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div className="relative">
                            <IonIcon
                                icon={schoolOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                type="text"
                                placeholder={university}
                                className="border-2 outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3 pl-10 placeholder-black "
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                            ></input>
                        </div>
                        <div className="relative">
                            <IonIcon
                                icon={locationOutline}
                                className="text-2xl text-[#279477] absolute left-2 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                type="text"
                                placeholder={location}
                                className="border-2 outline-none focus:border-2 focus:border-green-500 w-full rounded-sm py-2 px-3 pl-10 placeholder-black "
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/4">
                    <button className="w-full pt-10 pb-5 border-b-4 text-lg font-semibold text-green-700 border-green-700 ">
                        Student Profile
                    </button>
                    <div className="flex flex-row mt-10">
                        <input
                            type="text"
                            placeholder="About Me"
                            className="w-full border-2 pl-2 py-2 outline-none font-semibold text-lg focus:border-green-700"
                            onChange={(e) => setAbout(e.target.value)}
                        ></input>
                        <IonIcon
                            icon={trashOutline}
                            className="text-xl text-[#279477] pl-2"
                        />
                    </div>
                    <div className="flex flex-row mt-10">
                        <input
                            type="text"
                            placeholder="Add Short Description"
                            className="w-full pb-10 pl-2 pt-2 font-semibold text-lg border-2 outline-none focus:border-green-700"
                            onChange={(e) => setDescription(e.target.value)}
                        ></input>
                        <IonIcon
                            icon={trashOutline}
                            className="text-xl text-[#279477] pl-2"
                        />
                    </div>
                </div>
            </div>
            <Chaticon/>
            <Footer />
        </body>
    );
}
export default Editprofile;
