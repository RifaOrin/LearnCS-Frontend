import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Params, useParams, useNavigate } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Navbar from "./navbar";
import Chaticon from "./chatIcon";
import { IonIcon } from "@ionic/react";
import { helpCircleOutline, helpCircleSharp, playCircleOutline, readerOutline,checkmarkCircleOutline } from "ionicons/icons";
const courseUrl = `http://127.0.0.1:8000/course/`;
const quizattempUrl = "http://127.0.0.1:8000/course/2/module/10/quiz/3/quizAttempt/";

function ContentShow() {
    const { course_id } = useParams();
    const [userid, setUserid] = useState("");
    const [quiz, setQuiz] = useState([]);
    const [pdf, setPdf] = useState([]);
    const [video, setVideo] = useState([]);
    const [modules, setModule] = useState([]);
    const [expandedModuleId, setExpandedModuleId] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState("");
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [videoTitle, setVideoTitle] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(false);
    const [visitquiz, setVisitquiz] = useState(false);
    const [quizMark, setQuizmark] = useState(null);
    const [quizTitle, setQuizTitle] = useState(null);
    const [quizModuleid, setQuizModuleId] = useState(null);
    const [quizid, setQuizid] = useState(null);
    const Userurl = "http://127.0.0.1:8000/auth/users/me/";
    const baseUrl = `http://127.0.0.1:8000/user/`;
    const navigate = useNavigate();
    const Access = localStorage.accessToken;
    const isLoggedIn =!! userid;
    const isAttemp =!! quizMark;

    const handleVideoClick = (videoLink,title) => {
        setSelectedVideo(videoLink);
        setVideoTitle(title); // Show the selected video
        setSelectedPdf(null); // Close the PDF display
        setSelectedQuiz(null)
    };
    const handleQuizClick = (title,moduleid,quizid) => {
        axios
            .get(courseUrl + course_id + "/module/" + moduleid + "/quiz/" + quizid +"/quizAttempt/" )
            .then((response) => {
                const attempdata = response.data;
                console.log("attempdata:", attempdata);
                attempdata.map((attemp) => {
                    if ( attemp.user === userid) {
                        setVisitquiz(true);
                        const mark = attemp.marks_obtained;
                        setQuizmark(mark); // Use the mark variable here
                    }
                });
            })


        setSelectedQuiz(true);
        setQuizTitle(title);
        setQuizModuleId(moduleid);
        setQuizid(quizid);
        setSelectedPdf(null); // Close the PDF display
        setSelectedVideo(null);
        //console.log(selectedVideo)
    };

    const handlePdfClick = (pdfTitle) => {
        console.log(pdfTitle);

        if (selectedPdf === pdfTitle) {
            setSelectedPdf(null); // Close the PDF display
        } else {
            setSelectedPdf(pdfTitle);
            setSelectedVideo(null) // Show the selected PDF content
            setSelectedQuiz(null)
        }
    };
    useEffect(() => {
        axios
            .get(Userurl, {
                headers: {
                    Authorization: `JWT ${Access}`,
                },
            })
            .then((response) => {
                setUserid(response.data.id)
            
            })
            .catch((error) => {
                if (error.message === "Request failed with status code 401") {
                    navigate("/login");
                }
            });
            
    }, [Access, navigate]);


    useEffect(() => {
        console.log("Updated selectedPdf:", selectedPdf);
    }, [selectedPdf]);
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
        axios.get(courseUrl + course_id + "/module").then((response) => {
            setModule(response.data);
        });
    }, []);

    useEffect(() => {
        if (expandedModuleId) {
            axios
                .get(
                    courseUrl +
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
                    courseUrl +
                        course_id +
                        "/module/" +
                        expandedModuleId +
                        "/pdf/"
                )
                .then((response) => {
                    //console.log(expandedModuleId);
                    setPdf(response.data);
                });

            axios
                .get(
                    courseUrl +
                        course_id +
                        "/module/" +
                        expandedModuleId +
                        "/video/"
                )
                .then((response) => {
                    //console.log(1);
                    setVideo(response.data);
                });
        }
    }, [expandedModuleId, course_id]);

    //const viewerRef = React.createRef();

    const newplugin = defaultLayoutPlugin();

    return (
        <body className="min-h-screen">
            <Navbar />
        <div className=" flex flex-row" >
            <div className="h-screen flex flex-col pt-14 pl-14 mr-4 w-1/4 overflow-y-auto border-y shadow-lg " style={{ height: "85vh" }}>
                {modules.map((module) => (
                    <div key={module.id} className="mb-3">
                        <Link to="#" className="text-base font-semibold text-start" onClick={() => toggleModuleDropdown(module.id)}>
                            {module.name}
                        </Link>
                        {expandedModuleId === module.id && (
                            <div>
                                
                                <ul>
                                    {video.map((item) => (
                                        <li className="flex flex-row items-center space-x-2 pt-3 pb-2" key={item.id}>
                                            <IonIcon
                                                icon={playCircleOutline}
                                                className="text-2xl text-[#279477]"
                                            />
                                            <p className="font-semibold text-sm">Video:</p>
                                            <Link to="#" className=" text-sm" onClick={() => handleVideoClick(item.video_file,item.title)}>
                                                 {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                
                                <ul>
                                    {pdf.map((item) => (
                                        <li className="flex flex-row items-center space-x-2 pt-2 pb-2" key={item.id}>
                                            <IonIcon
                                                icon={readerOutline}
                                                className="text-2xl text-[#279477]"
                                            />
                                            <p className="font-semibold text-sm">Pdf:</p>
                                            <Link to="#" className=" text-sm" onClick={() => handlePdfClick(item.pdf_file)}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                
                                <ul className="flex flex-row items-center space-x-2 pt-2 pb-2">
                                <IonIcon
                                        icon={helpCircleOutline}
                                        className="text-2xl text-[#279477]"
                                />
                                <p className="font-semibold text-sm">Quiz:</p>
                                    {quiz.map((item) => (
                                        <li className="text-sm" key={item.id}>
                                            <Link to="#" className=" text-sm" onClick={() => handleQuizClick(item.quiz_title,module.id,item.id)}>       
                                                {item.quiz_title}
                                            </Link>
                                            {/* {visitquiz && (
                                                    <IonIcon
                                                        icon={checkmarkCircleOutline}
                                                        className="text-green-500"
                                                    />
                                                )} */}
                                        </li>
                                    ))}
                                </ul>
                                
                                
                                
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="w-3/4">
                
                <div>
                    {selectedPdf && (
                        <div className="h-1/3 w-11/12 border rounded-lg shadow p-4 mb-4" style={{ height: "85vh" }}>
                            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                                <Viewer fileUrl={selectedPdf} plugins={[newplugin]} />
                            </Worker>
                        </div>
                    )}
                    
                </div>
                <div> 
                {selectedVideo && (
                    
                    <div className="p-6">
                        <h1 className=" text-4xl font-medium mb-10 mt-10 ml-14 " >{videoTitle}</h1>
                        <video controls className="w-3/4 ml-14">
                            <source src={selectedVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        
                    </div>
                )}
                </div>
                <div>
                    {selectedQuiz && (
                        <div className="pl-10 pt-20">
                            <h1 className="text-4xl font-medium">{quizTitle}</h1>
                            
                            <div className="flex items-center justify-between mt-20 pt-6 pb-6 border-t-2 border-b-2">
                                    <p class="text-left text-base font-medium">Submit your quiz</p>
                                    {isAttemp?null :(
                                        <Link
                                        to={`/quizquestion/${course_id}/${quizModuleid}/${quizid}`}
                                    >
                                    <button class="ml-auto bg-[#13974c] hover:bg-[#0dc55d] text-white text-base font-medium rounded px-4 py-2">Start Quiz</button>
                                    </Link>
                                     )} 
                            </div>
                            <div className="flex items-center justify-between pt-6 pb-6 border-b-2">
                                <div className="flex flex-col space-y-3">
                                    <p className="text-left text-base font-medium">Receive grade</p>
                                    <p className="text-sm text-gray-400 font-semibold">To pass 80% or higher</p>
                                </div>
                                <div className="flex flex-col space-y-3 border-l-2 pl-5">
                                    <p className="ml-auto pr-3 text-base font-medium">Your grade</p>
                                    <p>{quizMark}</p>
                                </div>
                            </div>


                                
                           

                        </div>
                    )}
                </div>

            </div>
        </div>
        {isLoggedIn && (
            <Chaticon/>
            )}
        </body>
    );
}
export default ContentShow;
