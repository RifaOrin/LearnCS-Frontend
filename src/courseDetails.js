import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = `http://127.0.0.1:8000/course/`;
console.log("hello");

function CourseDetails() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [cover_photo, setCover_photo] = useState("");
    const [learning, setLearning] = useState("");
    const [skills, setSkills] = useState("");

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
            .get(baseUrl + id + "/")
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

        axios.get(baseUrl + id + "/instructor/").then((response) => {
            setInstructor(response.data);
        });

        axios.get(baseUrl + id + "/module").then((response) => {
            setModule(response.data);
        });

    }, []);

    useEffect(() => {
        if (expandedModuleId) {
            axios
                .get(baseUrl + id + "/module/" + expandedModuleId + "/quiz/")
                .then((response) => {
                    setQuiz(response.data);
                });

            axios
                .get(baseUrl + id + "/module/" + expandedModuleId + "/pdf/")
                .then((response) => {
                    console.log(expandedModuleId);
                    setPdf(response.data);
                });

            axios
                .get(baseUrl + id + "/module/" + expandedModuleId + "/video/")
                .then((response) => {
                    console.log(1);
                    setVideo(response.data);
                });
        }
    }, [expandedModuleId, id]);
    return (
        <div style={styles.container}>
            <img src={cover_photo} alt={title} style={styles.image} />
            <h1 style={styles.title}>{title}</h1>
            <p>{description}</p>
            <p>Category: {category}</p>

            <div>
                <h2 style={styles.subtitle}>Learning</h2>

                {learning.split(". ").map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
            <div>
                <h2 style={styles.subtitle}>Skills</h2>

                {skills.split(", ").map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>

            <h2 style={styles.subtitle}>Instructor</h2>
            {instructor.map((instructorDetails) => {
                const { id, name, profession, photo, description } =
                    instructorDetails;
                return (
                    <div>
                        <h1>{name}</h1>
                        <p>{profession}</p>
                        <img src={photo} />
                        <p>{description}</p>
                    </div>
                );
            })}

            <h2 style={styles.subtitle}>Module</h2>
            {module.map((Modules) => {
                const { id, name } = Modules;
                return (
                    <div key={id}>
                        <h1
                            onClick={() => toggleModuleDropdown(id)}
                            style={styles.moduleTitle}
                        >
                            {name}
                        </h1>
                        {expandedModuleId === id && (
                            <div style={styles.dropdown}>
                                {/* Show quizzes */}
                                <h2>Quizzes:</h2>
                                {quiz.map((item) => (
                                    <p key={item.id}>{item.quiz_title}</p>
                                ))}

                                {/* Show PDFs */}
                                <h2>PDFs:</h2>
                                {pdf.map((item) => (
                                    <p key={item.id}>{item.title}</p>
                                ))}

                                {/* Show videos */}
                                <h2>Videos:</h2>
                                {video.map((item) => (
                                    <p key={item.id}>{item.title}</p>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default CourseDetails;

// Inline styles
const styles = {
    container: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    image: {
        width: "100%",
        marginBottom: "20px",
    },
    subtitle: {
        fontSize: "20px",
        fontWeight: "bold",
        marginTop: "20px",
    },
};
