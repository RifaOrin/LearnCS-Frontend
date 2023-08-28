import { IonIcon } from "@ionic/react";
import Footer from "./footer";
import Navbar from "./navbar";
import Chaticon from "./chatIcon";
import Profilepic from "./images/profilePhoto.jpg";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function Instructor() {

    const {instructor_id} = useParams();
    const {course_id} = useParams();

    const [instructor, setInstructor] = useState([]);
    const [instructorCourse, setInstructorCourse] = useState([]);
    const [courseCount, setCourseCount] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0); 
    const [error, setError] = useState("");

    const instrrctorlink = "http://127.0.0.1:8000/course/"+course_id+"/instructor/"
    const instrrctorCourselink = "http://127.0.0.1:8000/course/teacher/"+instructor_id+"/teachings/"

    useEffect(() => {
        axios
            .get(instrrctorlink)
            .then((response) => {
                setInstructor(response.data);
                
            })
            .catch((error) => {
                setError(error.message);
            });

        axios
            .get(instrrctorCourselink)
            .then((response) => {
                setInstructorCourse(response.data);
                setCourseCount(response.data.length);

                const totalStudentsCount = response.data.reduce(
                    (total, course) => total + course.students.length,
                    0
                );
                setTotalStudents(totalStudentsCount);
                
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    return (
        <body className="bg-[#F4F4F4] min-h-screen">
            <Navbar />

            <div className="flex flex-col md:flex-row lg:space-x-4 pl-20 pr-20 pb-10">
            {instructor.map((singleInstructor) => (
                <div  key={singleInstructor.id} className="w-full lg:w-1/4 flex flex-col space-y-8 border lg:ml-20 p-12 justify-center items-center">
                    <div className="w-40 h-40 overflow-hidden rounded-full">
                        <img
                            src={singleInstructor.photo}
                            className="object-cover w-full h-full"
                        ></img>
                    </div>
                    <div className="flex flex-col space-y-2 items-center justify-center">
                        <h1 className="text-lg md:text-xl pb-1 flex justify-center font-medium">
                            {singleInstructor.name}
                        </h1>
                        <p className="text-md text-gray-500 pb-2 text-center">{singleInstructor.profession}</p>
                        <p className="text-sm font-semibold px-2 py-1 rounded-sm cursor-pointer text-[#05F26C] bg-[#012326]" >
                            Instructor
                        </p>
                        <p className="text-sm  text-gray-500 italic pt-5 border-b-2 pb-5">
                            norman88@gmail.com
                        </p>
                        <div className="flex flex-row space-x-1 pt-5">
                            <div className="flex flex-col space-y-1 justify-center items-center border-r-2 pr-5">
                                <p className="text-lg font-bold">{totalStudents}</p>
                                <p className="text-sm font-normal">Students</p>
                            </div>
                            <div className="flex flex-col space-y-1 justify-center items-center pl-5">
                                <p className="text-lg font-bold">{courseCount}</p>
                                <p className="text-sm font-normal">Courses</p>
                            </div>
                        
                        </div>
                    </div>
                </div>))}
                <div className="w-full lg:w-3/4">
                {instructor.map((singleInstructor) => (
                    <div>
                    <h1 className="text-2xl font-bold pl-10 pt-16">About Me</h1>
                    <p className="text-lg font-normal pt-7 pl-10 text-justify">{singleInstructor.description}</p>
                    </div>))}

                    {instructorCourse.map((Instructorcourses) => (
                    <div>
                    <h1 className="text-2xl font-bold pl-10 pt-16 pb-10">Teaching</h1>
                    <div key={Instructorcourses.id} className="pl-10 max-w-xs mx-auto md:mx-0">
                                    <Link
                                        to={`/courseDetails/${Instructorcourses.id}#courseDetailsStart`}
                                        className="card-link"
                                    >
                                        <div className="card hover:scale-105 transform transition-transform duration-300">
                                            <div className="image-container h-40">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={Instructorcourses.cover_photo}
                                                    alt={Instructorcourses.title}
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
                                                    <span>{Instructorcourses.title}</span>
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
                    </div>))}

                                            
                
                </div>
            </div>
            <Chaticon/>
            <Footer />
        </body>
    );
}
export default Instructor;
