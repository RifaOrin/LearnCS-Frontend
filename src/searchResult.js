// SearchResult.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "./navbar";

const url = "https://kasifzisan.pythonanywhere.com/course/";

function SearchResult() {
    const { searchValue } = useParams();
    const [courses, setCourses] = useState([]);
    const [courseIds, setCourseIds] = useState([]);
    const [courseInstructors, setCourseInstructors] = useState([]);

    useEffect(() => {
        axios.get(url + `?search=${searchValue}`).then((response) => {
            setCourses(response.data);

            const ids = response.data.map(course => course.id);
            setCourseIds(ids);
        });
    });

    useEffect(() => {
        const fetchInstructorsSequentially = async () => {
            const instructorInfoArray = [];
    
            for (const courseId of courseIds) {
                try {
                    const response = await axios.get(`${url}${courseId}/instructor`);
                    const instructorName = response.data[0].name;
                    instructorInfoArray.push({ courseId, instructorName });
                    setCourseInstructors(instructorInfoArray);
                } catch (error) {
                    console.error(`Error fetching instructor data for course ID ${courseId}:`, error);
                }
            }
    
            
        };
    
        if (courseIds.length > 0) {
            fetchInstructorsSequentially();
        }
    }, [courseIds]);

    return (
        <body className="bg-[#F2F2F2] min-h-screen">
            <Navbar />
            <div className="course-container max-w-5xl mx-auto my-0 px-20 py-20 bg-[#F2F2F2]">
                <h2
                    className="course-heading font-poppins font-bold text-center text-[#012326] text-4xl pb-20"
                    
                >
                    Searching result for - '{searchValue}'
                </h2>
                
                <div className="course-list grid grid-cols-3 gap-3 -mx-3">
                    {courses.map((course) => {
                        const { id, title, cover_photo,students } = course;
                        const instructorInfo = courseInstructors.find(info => {
                            if (info) {
                                console.log("Comparing:", info.courseId, id);
                                return info.courseId === id;
                            }
                            return false;
                        });
                        const instructorName = instructorInfo ? instructorInfo.instructorName : "Unknown Instructor";
                        return (
                            <div key={id}>
                                <Link
                                    to={`/courseDetails/${id}`}
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
                                                {students.length} student{students.length !== 1 ? 's' : ''}
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
                                                        {instructorName}
                                                    </span>
                                                </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </body>
    );
}

export default SearchResult;
