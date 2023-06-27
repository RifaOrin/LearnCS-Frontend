import React, { useState, useEffect } from "react";
import axios from "axios";


function Courses() {
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
        <body className="bg-[#012326] ">
        <div className="course-container max-w-5xl mx-auto my-0 px-20 py-20 bg-[#012326]">
            <h2 className="course-heading font-poppins font-bold text-center text-white pb-7" style={{ fontSize: '3rem' }}>Explore Inspiring CS Courses</h2>
            {error && <p className="error text-red-500">Error: {error}</p>}
            <div className="categories-container mb-20 flex items-center justify-center">
                {/*<h2>Categories</h2>*/}
                <button className="font-poppins text-lg font-semibold text-[#002333] mr-2.5 px-3.5 py-1 border border-transparent bg-[#05F26C] rounded-full" onClick={() => CategorySelect(null)}>All</button>
                <button className="font-poppins text-lg font-semibold text-white mr-2.5 px-3.5 py-1 border border-white rounded-full hover:text-[#002333] hover:bg-[#05F26C] hover:border-transparent focus:outline-none" onClick={() => CategorySelect("Programming")}>
                    Programming
                </button>
                <button className="font-poppins text-lg font-semibold text-white mr-2.5 px-3.5 py-1 border border-white rounded-full hover:text-[#002333] hover:bg-[#05F26C] hover:border-transparent focus:outline-none"
                    onClick={() => CategorySelect("Software Engineering")}
                >
                    Software Engineering
                </button> 
                <button className="font-poppins text-lg font-semibold text-white mr-2.5 px-3.5 py-1 border border-white rounded-full hover:text-[#002333] hover:bg-[#05F26C] hover:border-transparent focus:outline-none" onClick={() => CategorySelect("Database")}>
                    Database
                </button>
                <button className="font-poppins text-lg font-semibold text-white mr-2.5 px-3.5 py-1 border border-white rounded-full hover:text-[#002333] hover:bg-[#05F26C] hover:border-transparent focus:outline-none" onClick={() => CategorySelect("UI/UX")}>
                    UI/UX
                </button>
            </div>
            <div className="course-list grid grid-cols-3 gap-3 -mx-3">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => {
                        const { id, title, cover_photo, instructor } = course;
                        return (
                           

                            <div key={id}>
                             
                                <div class = "card">
                                    <div className="image-container h-40">
                                    <img className="w-full h-full object-cover" src={cover_photo} alt={title} />
                                    </div>

                                    <div className="p-5 flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <span className="badge">72 students</span>
                                            <span className="badge">1hr 13min</span>
                                        </div>

                                        <h2 className="course-title"><span>{title}</span></h2>

                                        <div className="mt-5 flex gap-2">
                                            <span className="course-instructor"><p>{instructor}</p></span>
                                        </div>

                                    </div>

                                

                                </div>
                              
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