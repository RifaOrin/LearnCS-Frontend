import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Courses() {
    const url = "http://127.0.0.1:8000/course/";
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    // const [courseID, setCourseId] = useState(null);
    // const [instructor, setInstructor] = useState([]);

    // const instructorName = (id) => {
    //     if (courseID === id) {
    //         setCourseId(null);
    //     } else {
    //         setCourseId(id);
    //     }
    // };

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                console.log(response.data);
                setCourses(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    // useEffect(() => {
    //     if (courseID) {
    //         axios.get(url + courseID + "/instructor/").then((response) => {
    //             setInstructor(response.data);
    //         });
    //     }
    // }, [courseID]);

    const CategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredCourses = selectedCategory
        ? courses.filter((course) => course.category === selectedCategory)
        : courses;

    return (
        <body className="bg-[#012326] ">
            <div className="course-container w-full lg:max-w-5xl mx-auto my-0 px-20 py-20 bg-[#012326]">
                <h2
                    className="text-3xl md:text-4xl lg:text-5xl course-heading font-poppins font-bold text-center text-white mb-20"
                    
                >
                    Explore Inspiring CS Courses
                </h2>
                {error && <p className="error text-red-500">Error: {error}</p>}
                <div className="categories-container mb-20 flex flex-wrap items-center justify-center">
                    {/*<h2>Categories</h2>*/}
                    <button
                        className={`font-poppins text-lg font-semibold mr-2.5 mb-2 px-3.5 py-1 border  rounded-full hover:text-[#002333] hover:bg-[#05F26C] hover:border-transparent focus:outline-none
                        ${
                            selectedCategory === null
                                ? "bg-[#05F26C] text-[#002333] border-transparent"
                                : "border-white text-white"
                        }`}
                        onClick={() => CategorySelect(null)}
                    >
                        All
                    </button>
                    <button
                        className={`font-poppins text-lg font-semibold  mr-2.5 mb-2 px-4 py-1 border  rounded-full hover:text-[#002333] hover:bg-[#05F26C] hover:border-transparent focus:outline-none
                        ${
                            selectedCategory === "Programming"
                                ? "bg-[#05F26C] text-[#002333] border-transparent"
                                : "border-white text-white"
                        }`}
                        onClick={() => CategorySelect("Programming")}
                    >
                        Programming
                    </button>
                    <button
                        className={`font-poppins text-lg font-semibold  mr-2.5 mb-2 px-3.5 py-1 border  rounded-full hover:text-[#002333] hover:bg-[#05F26C] hover:border-transparent focus:outline-none
                        ${
                            selectedCategory === "Software Engineering"
                                ? "bg-[#05F26C] text-[#002333] border-transparent"
                                : "border-white text-white"
                        }`}
                        onClick={() => CategorySelect("Software Engineering")}
                    >
                        Software Engineering
                    </button>
                    
                    <button
                        className={`font-poppins text-lg font-semibold  mr-2.5 mb-2 px-3.5 py-1 border  rounded-full hover:text-[#002333] hover:bg-[#05F26C] hover:border-transparent focus:outline-none
                        ${
                            selectedCategory === "Database"
                                ? "bg-[#05F26C] text-[#002333] border-transparent"
                                : "border-white text-white"
                        }`}
                        onClick={() => CategorySelect("Database")}
                    >
                        Database
                    </button>
                   
                   
                    <button
                        className={`font-poppins text-lg font-semibold  mr-2.5 mb-2 px-3.5 py-1 border  rounded-full hover:text-[#002333] hover:bg-[#05F26C] hover:border-transparent focus:outline-none
                        ${
                            selectedCategory === "UI/UX"
                                ? "bg-[#05F26C] text-[#002333] border-transparent"
                                : "border-white text-white"
                        }`}
                        onClick={() => CategorySelect("UI/UX")}
                    >
                        UI/UX
                    </button>
                   
                </div>
                <div className="course-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 -mx-3">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => {
                            const { id, title, cover_photo } = course;

                            return (
                                <div key={id} className="max-w-xs mx-auto md:mx-0">
                                    <Link
                                        to={`/courseDetails/${id}#courseDetailsStart`}
                                        className="card-link"
                                    >
                                        <div className="card hover:scale-105 transform transition-transform duration-300">
                                            <div className="image-container h-40">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={cover_photo}
                                                    alt={title}
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
                                                    <span>{title}</span>
                                                </h2>

                                                <div className="mt-5 flex gap-2">
                                                    <span className="course-instructor">
                                                        {/* <p onChange={() => instructorName(id)}>{instructor.name}</p> */}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })
                    ) : (
                        <p className="no-courses">No courses available.</p>
                    )}
                </div>
            </div>
        </body>
    );
}

export default Courses;
