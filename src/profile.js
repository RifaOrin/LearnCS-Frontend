import Profilepic from "./images/profilePhoto.jpg";
import { IonIcon } from "@ionic/react";
import Footer from "./footer";
import { caretForwardCircleOutline } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const baseUrl = `http://127.0.0.1:8000/user/`;
const id = "1";
function Profile() {
    //const { id } = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [profile_picture, setProfilePicture] = useState("");
    const [university, setUniversity] = useState("");
    const [first_name, setFirstname] = useState("");
    const [last_name, setLastname] = useState("");
    const [location, setLocation] = useState("");
    const [about_me, setAbout] = useState("");
    const [short_description,setDescription] = useState("");
    const [enrollcourse, setEnrollcourse] = useState([]);
    const [showEnrolledCourses, setShowEnrolledCourses] = useState(false);
    const numberOfCourses = enrollcourse.length;
    const [showProfileInfo, setShowProfileInfo] = useState(true);

    

    useEffect(() => {
        axios.get(baseUrl + id + "/").then((response) => {
            setUsername(response.data.username);
            setEmail(response.data.email);
            setPhoneNumber(response.data.phone_number);
            setProfilePicture(response.data.profile_picture);
            setUniversity(response.data.university);
            setFirstname(response.data.first_name);
            setLastname(response.data.last_name);
            setLocation(response.data.location);
            setAbout(response.data.about_me);
            setDescription(response.data. short_description);
        });

        axios.get(baseUrl + id + "/enrolledCourses/").then((response) => {
            setEnrollcourse(response.data);
        });
    }, []);

    const toggleProfileInfo = () => {
        setShowProfileInfo(true);
        setShowEnrolledCourses(false);
    };

    const toggleEnrolledCourses = () => {
        setShowEnrolledCourses(true);
        setShowProfileInfo(false);
    };

    return (
        <body className="bg-gray-100 min-h-screen">
            <div className="sticky top-0 z-10 w-full h-20 border bg-gray-100 flex justify-end items-center space-x-2 pr-40">
                <Link to = {`/editprofilePage/${id}`}>
                <button className="text-black hover:text-white text-sm font-semibold px-3 py-2 cursor-pointer border rounded-md outline-none bg-gray-100 hover:bg-black">
                    Edit Profile
                </button>
                </Link>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 pl-20 pr-20 pb-10">
                <div className="w-1/4 flex flex-col space-y-8 border ml-20 p-12 justify-center items-center">
                    <div className="w-40 h-40 overflow-hidden rounded-full">
                        <img
                            src={profile_picture}
                            className="object-cover w-full h-full"
                        ></img>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-2xl flex justify-center ">
                            {first_name} {last_name}
                        </h1>
                        <p className="text-xs pb-5 flex justify-center text-gray-500">
                            Student
                        </p>
                        <p className="text-md flex justify-center text-gray-500">
                            {university}
                        </p>
                        <p className="text-sm flex justify-center text-gray-500">
                            {location}
                        </p>
                        <p className="text-sm flex justify-center text-gray-500 italic pt-5 border-b-2 pb-5">
                            {email}
                        </p>
                        <div className="flex flex-row space-x-1 pt-5">
                            <IonIcon
                                icon={caretForwardCircleOutline}
                                className="text-xl text-gray-500"
                            />
                            <p className="pb-3 font-semibold text-sm text-gray-500">
                                {numberOfCourses} Course Enrolled
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-3/4">
                    <button className={`w-1/2 pt-10 pb-5 border-b-2 hover:border-b-4 text-black text-md font-semibold
                    ${
                        showProfileInfo === true
                            ? "border-b-4 text-green-700 border-green-700"
                            : ""
                    }`}
                        onClick={toggleProfileInfo}
                    >
                        Profile
                    </button>

                    <button
                    className={`w-1/2 pt-10 pb-5 border-b-2 hover:border-b-4 text-black text-md font-semibold
                    ${
                        showEnrolledCourses === true
                            ? "border-b-4 text-green-700 border-green-700"
                            : ""
                    }`}
                    onClick={toggleEnrolledCourses}
                >
                    Enrolled Courses
                </button>
                {showProfileInfo && (
                    <div>
                        <h2 className="text-2xl font-semibold pt-5">About Me:</h2>
                        <p>{about_me}</p>
                        <h2 className="text-2xl font-semibold pt-5">Short Description:</h2>
                        <p>{short_description}</p>
                    </div>
                )}

                {showEnrolledCourses && (
                    <div>
                    {/* <ul> */}
                        {enrollcourse.map((course) => (
                            // <li key={course.id}>
                                <div className="card">
                                            <div className="image-container h-40">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={course.cover_photo}
                                                    alt={course.title}
                                                />
                                            </div>

                                            <div className="p-5 flex flex-col gap-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="badge">
                                                        72 students
                                                    </span>
                                                    <span className="badge">
                                                        1hr 13min
                                                    </span>
                                                </div>

                                                <h2 className="course-title">
                                                    <span>{course.title}</span>
                                                </h2>

                                                
                                            </div>
                                        </div>
                            // </li>
                        ))}
                    {/* </ul> */}
                </div>
                )}
                </div>
            </div>
            <Footer />
        </body>
    );
}
export default Profile;
