import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
} from "ionicons/icons";
import Footer from "./footer";
const baseUrl = `http://127.0.0.1:8000/course/`;
console.log("hello");

function CourseDetails() {
    const { course_id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [cover_photo, setCover_photo] = useState("");
    const [learning, setLearning] = useState("");
    const [skills, setSkills] = useState("");
    const [instructorName, setInstructorName] = useState("");

    const [quiz, setQuiz] = useState([]);
    const [instructor, setInstructor] = useState([]);
    const [module, setModule] = useState([]);
    const [pdf, setPdf] = useState([]);
    const [video, setVideo] = useState([]);

    const [isError, setIsError] = useState("");

    const [expandedModuleId, setExpandedModuleId] = useState(null);

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

    useEffect(() => {
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
        });

        axios.get(baseUrl + course_id + "/module").then((response) => {
            setModule(response.data);
        });
        const element = document.getElementById('courseDetailsStart');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    }, []);

    useEffect(() => {
        if (expandedModuleId) {
            axios
                .get(baseUrl + course_id+ "/module/" + expandedModuleId + "/quiz/")
                .then((response) => {
                    setQuiz(response.data);
                });

            axios
                .get(baseUrl + course_id + "/module/" + expandedModuleId + "/pdf/")
                .then((response) => {
                    console.log(expandedModuleId);
                    setPdf(response.data);
                });

            axios
                .get(baseUrl + course_id + "/module/" + expandedModuleId + "/video/")
                .then((response) => {
                    console.log(1);
                    setVideo(response.data);
                });
        }
    }, [expandedModuleId, course_id]);

    // //const Instructorarray = instructor;
    // if(instructor && instructor.length>0){
    //     setInstructorName(instructor[0].name);
    // }

    return (
        <div id="courseDetailsStart">
            <div className="w-full flex flex-row bg-[#012326] pb-5">
                <div className="pl-40 w-3/4 pt-20 pr-10 text-white">
                    <h1 className="text-4xl font-bold mb-5">{title}</h1>
                    <p className="text-justify">{description}</p>
                    <p className="mt-2">Category: {category}</p>
                    {instructor.map((instructorDetails) => {
                        const { id, name } = instructorDetails;
                        return (
                            <p className="mt-3 text-sm">
                                Created by{" "}
                                <span className="underline text-[#7ED98B] cursor-pointer">
                                    {name}{" "}
                                </span>
                            </p>
                        );
                    })}
                </div>
                <div className="pr-40 w-2/4 pt-20">
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

                <div className=" max-w-sm p-10 ml-10 mt-10 mr-20 border border-gray-200 rounded-lg shadow-lg">
                    <h2 className="mb-2 pb-3 text-2xl font-bold tracking-tight text-gray-900">
                        $33.08
                    </h2>
                    <a
                        className="px-7 py-3 sm:px-3 sm:py-2 text-sm font-bold text-center text-white bg-[#4f975a] rounded-sm hover:bg-[#316439]"
                        href=""
                    >
                        Buy Now
                    </a>
                    <p className="text-xs font-medium text-gray-500 pt-5">
                        Aren't member?
                    </p>
                    <Link to = "/signup">
                    <p className="text-xs font-semibold underline text-[#4f975a]">
                        Join for free
                    </p>
                    </Link>
                </div>
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
            {module.map((Modules) => {
                const { id, name } = Modules;
                const module_id = id;
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
                                        <IonIcon
                                            icon={logoYoutube}
                                            className="text-xl"
                                        />
                                        {video.map((item) => (
                                            <p
                                                className="text-sm text-gray-600"
                                                key={item.id}
                                            >
                                                {item.title}
                                            </p>
                                        ))}
                                    </div>
                                    {/* Show PDFs */}

                                    <div className="inline-flex pl-3 pb-3 pt-3 space-x-2">
                                        <IonIcon
                                            icon={documentTextOutline}
                                            className="text-xl"
                                        />
                                        {pdf.map((item) => (
                                            <p
                                                className="text-sm text-gray-600"
                                                key={item.id}
                                            >
                                                {item.title}
                                            </p>
                                        ))}
                                    </div>
                                    {/* Show quizzes */}

                                    <div className="inline-flex pl-3 pb-3 pt-3 space-x-2">
                                        <IonIcon
                                            icon={helpCircleOutline}
                                            className="text-xl"
                                        />
                                        {quiz.map((item) => (
                                            <Link to ={`/quizquestion/${course_id}/${Modules.id}/${item.id}`}>
                                            <p
                                                className=" text-sm text-gray-600"
                                                key={item.id}
                                            >
                                                {item.quiz_title}
                                            </p>
                                            </Link>
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
                                <Link to= {`/instructor/${instructorDetails.id}/${course_id}`}>
                                <h1 className="text-[#279477] font-semibold text-xl underline pb-5">
                                    {name}
                                </h1>
                                </Link>
                                <p className="text-md font-semibold pb-3">
                                    {profession}
                                </p>
                                <div className="flex flex-row">
                                    <img
                                        className="border rounded-full h-60"
                                        src={photo}
                                    />
                                    <div className="pl-10 pt-20 flex flex-col">
                                        <div className="inline-flex space-x-2">
                                            <IonIcon
                                                icon={caretForwardCircleOutline}
                                                className="text-2xl text-[#279477]"
                                            />
                                            <p className="pb-3 font-semibold">
                                                38 Courses
                                            </p>
                                        </div>
                                        <div className="inline-flex space-x-2">
                                            <IonIcon
                                                icon={peopleCircleOutline}
                                                className="text-2xl text-[#279477]"
                                            />
                                            <p className="font-semibold">
                                                167 Students
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="pt-5 pr-20 pb-6 text-justify">{description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
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
