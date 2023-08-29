import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import {
    caretForwardCircleOutline,
    checkmarkOutline,
    chevronDownOutline,
    peopleCircleOutline,
    logoYoutube,
    documentTextOutline,
    helpCircleOutline,
    lockClosedOutline,
    lockClosed,
} from "ionicons/icons";
import Navbar from "./navbar";
import Chaticon from "./chatIcon";
import Footer from "./footer";
const baseUrl = `https://kasifzisan.pythonanywhere.com/course/`;
const Userurl = "https://kasifzisan.pythonanywhere.com/auth/users/me/";

function CourseDetails() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const { course_id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [cover_photo, setCover_photo] = useState("");
    const [learning, setLearning] = useState("");
    const [skills, setSkills] = useState("");
    const [instructorId, setInstructorId] = useState(null);

    const [quiz, setQuiz] = useState([]);
    const [instructor, setInstructor] = useState([]);
    const [module, setModule] = useState([]);
    const [pdf, setPdf] = useState([]);
    const [video, setVideo] = useState([]);
    const [instructorCourse, setInstructorCourse] = useState([]);
    const [courseCount, setCourseCount] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [showEnrollmentPopup, setShowEnrollmentPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isLoggedIn, setIsLoggedin] = useState(false);

    const [isError, setIsError] = useState("");
    const [expandedModuleId, setExpandedModuleId] = useState(null);
    const Access = localStorage.accessToken;
    const instrrctorCourselink =
        "https://kasifzisan.pythonanywhere.com/course/teacher/" + instructorId + "/teachings/";
    const enrollmenturl =
        "https://kasifzisan.pythonanywhere.com/course/" + course_id + "/enrollment/";

    const handleEnrollmentPopup = () => {
        setShowEnrollmentPopup(true);
    };

    const closeEnrollmentPopup = () => {
        setShowEnrollmentPopup(false);
    };

    const handleLoginPopup = () => {
        setShowLoginPopup(true);
    };

    const closeLoginPopup = () => {
        setShowLoginPopup(false);
    };
    // Function to toggle the dropdown visibility
    const toggleModuleDropdown = (moduleId) => {
        if (expandedModuleId === moduleId) {
            // If the clicked module is already expanded, close it
            setExpandedModuleId(null);
        } else {
            // Otherwise, expand the clicked module
            setExpandedModuleId(moduleId);
        }
    };

    const handleEnroll = () => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
        } else {
            const enrollmentData = {
                course: course_id,
                user: userid,
            };

            axios
                .post(enrollmenturl, enrollmentData)
                .then((response) => {
                    // Handle successful enrollment
                    setIsEnrolled(true);
                    window.location.reload();
                })
                .catch((error) => {
                    // Handle enrollment error
                    console.error("Error enrolling:", error);
                });
        }
    };

    useEffect(() => {
        if (Access != undefined) {
            axios
                .get(Userurl, {
                    headers: {
                        Authorization: `JWT ${Access}`,
                    },
                })
                .then((response) => {
                    setUserid(response.data.id);
                    setIsLoggedin(true);
                })
                .catch((error) => {
                    if (
                        error.message === "Request failed with status code 401"
                    ) {
                        navigate("/login");
                    }
                });
        }
        axios
            .get(baseUrl + course_id + "/")
            .then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setCategory(response.data.category);
                setCover_photo(response.data.cover_photo);
                setLearning(response.data.learning);
                setSkills(response.data.skills);
            })
            .catch((error) => {
                setIsError(error.message);
                if (error.message === "Request failed with status code 401") {
                    //navigate('/login')
                }
            });

        axios.get(baseUrl + course_id + "/instructor/").then((response) => {
            setInstructor(response.data);

            setInstructorId(response.data[0].id);
        });

        axios.get(baseUrl + course_id + "/module").then((response) => {
            setModule(response.data);
        });
        const element = document.getElementById("courseDetailsStart");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }, [course_id]);

    useEffect(() => {
        // Fetch enrollment data
        axios
            .get(enrollmenturl)
            .then((response) => {
                const enrollmentData = response.data;
                const enrolledUserIds = enrollmentData.map(
                    (enrollment) => enrollment.user
                );
                if (enrolledUserIds.includes(userid)) {
                    setIsEnrolled(true);
                }
            })
            .catch((error) => {
                // Handle error
                console.error("Error fetching enrollment data:", error);
            });
    }, [userid]);

    useEffect(() => {
        if (instructorId) {
            axios.get(instrrctorCourselink).then((response) => {
                setInstructorCourse(response.data);
                setCourseCount(response.data.length);

                const totalStudentsCount = response.data.reduce(
                    (total, course) => total + course.students.length,
                    0
                );
                setTotalStudents(totalStudentsCount);
            });
        }
    }, [instructorId]);

    useEffect(() => {
        if (expandedModuleId) {
            axios
                .get(
                    baseUrl +
                        course_id +
                        "/module/" +
                        expandedModuleId +
                        "/quiz/"
                )
                .then((response) => {
                    setQuiz(response.data);
                });

            axios
                .get(
                    baseUrl +
                        course_id +
                        "/module/" +
                        expandedModuleId +
                        "/pdf/"
                )
                .then((response) => {
                    console.log(expandedModuleId);
                    setPdf(response.data);
                });

            axios
                .get(
                    baseUrl +
                        course_id +
                        "/module/" +
                        expandedModuleId +
                        "/video/"
                )
                .then((response) => {
                    console.log(1);
                    setVideo(response.data);
                });
        }
    }, [expandedModuleId, course_id]);

    const EnrollmentPopup = () => {
        return (
            <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-xl font-bold mb-2 text-center pb-5">
                        Enrollment Required
                    </h2>
                    <p className="mb-4 text-center text-lg font-medium text-red-600">
                        Please enroll in the course to access the content.
                    </p>
                    <div className="flex justify-center">
                    <button
                        className="bg-[#072746] text-white font-semibold px-4 py-2 rounded hover:bg-[#0a4988]"
                        onClick={closeEnrollmentPopup}
                    >
                        Close
                    </button>
                    </div>
                </div>
            </div>
        );
    };

    const LoginPopup = () => {
        return (
            <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                    <h2 className="text-xl font-bold mb-2 text-center pb-5">
                        Login Required
                    </h2>
                    <p className="mb-4 text-center text-base text-red-600 font-medium">Please Login First</p>
                    <div className="flex justify-center"> 
                    <button
                        className="bg-[#072746] text-white font-semibold px-4 py-2 rounded hover:bg-[#0a4988]"
                        onClick={closeLoginPopup}
                    >
                        Close
                    </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <body id="courseDetailsStart">
            <Navbar />
            <div className="w-full flex flex-col md:flex-row bg-[#00242C] pb-5">
                <div className="pl-20 w-5/6 md:pl-40 md:w-3/4 pt-14 pr-10 text-white">
                    <h1 className="text-4xl font-bold mb-5">{title}</h1>
                    <p className="text-justify">{description}</p>
                    <p className="mt-2">Category: {category}</p>
                    {instructor.map((instructorDetails) => {
                        const { id, name } = instructorDetails;
                        return (
                            <Link
                                to={`/instructor/${instructorDetails.id}/${course_id}`}
                            >
                                <p className="mt-3 text-sm">
                                    Created by{" "}
                                    <span className="underline text-[#7ED98B] cursor-pointer">
                                        {name}{" "}
                                    </span>
                                </p>
                            </Link>
                        );
                    })}
                </div>
                <div className="hidden md:inline-block pr-40 w-2/4 pt-20">
                    <img
                        className="border rounded-xl"
                        src={cover_photo}
                        alt={title}
                        style={styles.image}
                    />
                </div>
            </div>
            <div className="flex flex-row">
                <div className="w-3/4 pl-40 pt-5">
                    <div className="mt-5 pr-5 border-solid border-2 border-gray-300 shadow-md">
                        <h2 className="text-2xl font-semibold pt-5 pl-5 mb-3">
                            What you'll learn
                        </h2>

                        {learning.split(". ").map((item, index) => (
                            <div className="inline-flex mb-2 pl-5">
                                <IonIcon
                                    icon={checkmarkOutline}
                                    className="text-xl"
                                />
                                <p className="pl-3 pb-2" key={index}>
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {!isEnrolled && (
                    <div className="max-w-sm p-10 ml-10 mt-10 mr-20 border border-gray-200 rounded-lg shadow-lg">
                        <button
                            className="px-8 py-4 sm:px-3 sm:py-2 text-sm font-bold text-center text-white bg-[#4f975a] rounded-sm hover:bg-[#316439]"
                            onClick={handleEnroll}
                        >
                            Enroll Now
                        </button>

                        {isLoggedIn ? null : (
                            <p className="text-xs font-medium text-gray-500 pt-5">
                                Aren't a member?
                            </p>
                        )}
                        {!isLoggedIn && (
                            <Link to="/signup">
                                <p className="text-xs text-center font-semibold underline text-[#4f975a]">
                                    Join for free
                                </p>
                            </Link>
                        )}
                    </div>
                )}
            </div>

            <div className="w-3/4 pl-40 pt-5">
                <div className="mt-5 pr-5 pb-3 border-solid border-2 border-gray-300 shadow-md">
                    <h2 className="text-2xl font-semibold pt-5 pl-5 mb-3">
                        Skills you'll achieve
                    </h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                        {skills.split(", ").map((item, index) => (
                            <div className="inline-flex space-x-2 pl-4">
                                <IonIcon
                                    icon={checkmarkOutline}
                                    className="text-xl"
                                />

                                <p className="" key={index}>
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-semibold pt-10 pl-40 mb-3">
                Course Content
            </h2>
            {showEnrollmentPopup && <EnrollmentPopup />}
            {showLoginPopup && <LoginPopup />}
            {module.map((Modules) => {
                const { id, name } = Modules;
                const module_id = id;

                const isModuleEnrolled = isEnrolled;
                return (
                    <div className="w-3/4 pl-40 " key={id}>
                        <div
                            onClick={() => toggleModuleDropdown(id)}
                            className="pr-5 pt-2 pb-2 border-solid border-2 border-gray-300"
                        >
                            <div className="inline-flex space-x-2 items-center">
                                <h1 className="pl-3 pb-2 pt-2">{name}</h1>
                                <IonIcon
                                    onClick={() => toggleModuleDropdown(id)}
                                    icon={chevronDownOutline}
                                    className="text-xl"
                                />
                            </div>
                        </div>
                        <div className="pr-5 border-solid border-2 border-gray-300">
                            {expandedModuleId === id && (
                                <div className="flex flex-col">
                                    {/* Show videos */}

                                    <div className="inline-flex pl-3 pb-3 pt-3 space-x-2">
                                        {isModuleEnrolled ? (
                                            <IonIcon
                                                icon={logoYoutube}
                                                className="text-xl"
                                            />
                                        ) : (
                                            <IonIcon
                                                icon={lockClosed}
                                                className="text-xl"
                                            />
                                        )}
                                        {video.map((item) => (
                                            <p
                                                className="text-sm text-gray-600"
                                                key={item.id}
                                            >
                                                {isModuleEnrolled ? (
                                                    <Link
                                                        to={`/contentshow/${course_id}`}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                ) : (
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={
                                                            handleEnrollmentPopup
                                                        }
                                                    >
                                                        {item.title}
                                                    </span>
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                    {/* Show PDFs */}

                                    <div className="inline-flex pl-3 pb-3 pt-3 space-x-2">
                                        {isModuleEnrolled ? (
                                            <IonIcon
                                                icon={documentTextOutline}
                                                className="text-xl"
                                            />
                                        ) : (
                                            <IonIcon
                                                icon={lockClosed}
                                                className="text-xl"
                                            />
                                        )}
                                        {pdf.map((item) => (
                                            <p
                                                className="text-sm text-gray-600"
                                                key={item.id}
                                            >
                                                {isModuleEnrolled ? (
                                                    <Link
                                                        to={`/contentshow/${course_id}`}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                ) : (
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={
                                                            handleEnrollmentPopup
                                                        }
                                                    >
                                                        {item.title}
                                                    </span>
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                    {/* Show quizzes */}

                                    <div className="inline-flex pl-3 pb-3 pt-3 space-x-2">
                                        {isModuleEnrolled ? (
                                            <IonIcon
                                                icon={helpCircleOutline}
                                                className="text-xl"
                                            />
                                        ) : (
                                            <IonIcon
                                                icon={lockClosed}
                                                className="text-xl"
                                            />
                                        )}
                                        {quiz.map((item) => (
                                            <p
                                                className=" text-sm text-gray-600"
                                                key={item.id}
                                            >
                                                {isModuleEnrolled ? (
                                                    <Link
                                                        to={`/contentshow/${course_id}`}
                                                    >
                                                        {item.quiz_title}
                                                    </Link>
                                                ) : (
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={
                                                            handleEnrollmentPopup
                                                        }
                                                    >
                                                        {item.quiz_title}
                                                    </span>
                                                )}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            <div className="w-3/4 pl-40 pt-5">
                <div className="mt-5 pr-5 mb-7 border-solid border-2 border-gray-300 shadow-md">
                    <h2 className="text-2xl font-semibold pt-5 pl-5 pb-6">
                        Instructor
                    </h2>
                    {instructor.map((instructorDetails) => {
                        const { id, name, profession, photo, description } =
                            instructorDetails;

                        return (
                            <div className="pl-5 pb-2">
                                <Link
                                    to={`/instructor/${instructorDetails.id}/${course_id}`}
                                >
                                    <h1 className="text-[#279477] font-semibold text-xl underline pb-5">
                                        {name}
                                    </h1>
                                </Link>
                                <p className="text-md font-semibold pb-3">
                                    {profession}
                                </p>
                                <div className="flex flex-row">
                                    <div className="w-40 h-40 overflow-hidden rounded-full">
                                        <img
                                            className="object-cover w-full h-full"
                                            src={photo}
                                        />
                                    </div>
                                    <div className="pl-10 flex flex-col justify-center">
                                        <div className="inline-flex space-x-2">
                                            <IonIcon
                                                icon={caretForwardCircleOutline}
                                                className="text-2xl text-[#279477]"
                                            />
                                            <p className="pb-3 font-semibold">
                                                {courseCount} Courses
                                            </p>
                                        </div>
                                        <div className="inline-flex space-x-2">
                                            <IonIcon
                                                icon={peopleCircleOutline}
                                                className="text-2xl text-[#279477]"
                                            />
                                            <p className="font-semibold">
                                                {totalStudents} Students
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="pt-5 pr-20 pb-6 text-justify">
                                    {description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
            {isLoggedIn && <Chaticon />}
            <Footer />
        </body>
    );
}

export default CourseDetails;

// Inline styles
const styles = {
    image: {
        width: "100%",
        marginBottom: "20px",
    },
};
