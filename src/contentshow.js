import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Params, useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Navbar from "./navbar";
import { IonIcon } from "@ionic/react";
import { helpCircleOutline, helpCircleSharp, playCircleOutline, readerOutline } from "ionicons/icons";
const baseUrl = `http://127.0.0.1:8000/course/`;

function ContentShow() {
    const { course_id } = useParams();
    const [quiz, setQuiz] = useState([]);
    const [pdf, setPdf] = useState([]);
    const [video, setVideo] = useState([]);
    const [modules, setModule] = useState([]);
    const [expandedModuleId, setExpandedModuleId] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState("");
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (videoLink) => {
        setSelectedVideo(videoLink); // Show the selected video
        setSelectedPdf(null); // Close the PDF display

        //console.log(selectedVideo)
    };

    const handlePdfClick = (pdfTitle) => {
        console.log(pdfTitle);

        if (selectedPdf === pdfTitle) {
            setSelectedPdf(null); // Close the PDF display
        } else {
            setSelectedPdf(pdfTitle);
            setSelectedVideo(null) // Show the selected PDF content
        }

        //console.log(selectedPdf)
    };
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
        axios.get(baseUrl + course_id + "/module").then((response) => {
            setModule(response.data);
        });
    }, []);

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
                    //console.log(expandedModuleId);
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
            <div className="h-screen flex flex-col pt-14 pl-14 mr-4 w-1/5 overflow-y-auto" style={{ height: "85vh" }}>
                {modules.map((module) => (
                    <div key={module.id} className="mb-3">
                        <Link to="#" className="text-base font-semibold" onClick={() => toggleModuleDropdown(module.id)}>
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
                                            <Link to="#" className=" text-sm" onClick={() => handleVideoClick(item.video_file)}>
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
                                                
                                             {item.quiz_title}</li>
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
                        <div className="h-1/3 w-11/12  ml-14 border rounded-lg shadow p-4 mb-4" style={{ height: "95vh" }}>
                            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                                <Viewer fileUrl={selectedPdf} plugins={[newplugin]} />
                            </Worker>
                        </div>
                    )}
                    
                </div>
                <div> 
                {selectedVideo && (
                    
                    <div className="p-6">
                        <h1 className=" text-4xl font-medium mb-10 mt-10 ml-14 " >Introduction to MySQL</h1>
                        <video controls className="w-3/4 ml-14">
                            <source src={selectedVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        
                    </div>
                )}
                </div>
            </div>
        </div>
        </body>
    );
}
export default ContentShow;
