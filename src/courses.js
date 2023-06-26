import React, { useState, useEffect } from "react";
import axios from "axios";
import './tailwindcss/courses.css';

function Course() {
    const url = "http://127.0.0.1:8000/course/";
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

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

    const CategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const filteredCourses = selectedCategory
        ? courses.filter((course) => course.category === selectedCategory)
        : courses;

    return (
        <div className="course-container">
            <h1 className="course-heading">Course List</h1>
            {error && <p className="error">Error: {error}</p>}
            <div className="categories-container">
                <h2>Categories</h2>
                <button onClick={() => CategorySelect(null)}>All</button>
                <button onClick={() => CategorySelect("Programming")}>
                    Programming
                </button>
                <button
                    onClick={() => CategorySelect("Software Engineering")}
                >
                    Software Engineering
                </button>
                <button onClick={() => CategorySelect("Database")}>
                    Database
                </button>
                <button onClick={() => CategorySelect("UI/UX")}>
                    UI/UX
                </button>
            </div>
            <ul className="course-list">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => {
                        const { id, title, cover_photo, instructor } = course;
                        return (
                            <li key={id} className="course-item">
                                <img src={cover_photo} alt={title} />
                                <h2>{title}</h2>
                                <p>Instructor: {instructor}</p>
                            </li>
                        );
                    })
                ) : (
                    <p className="no-courses">No courses available.</p>
                )}
            </ul>
        </div>
    );
}

export default Course;
