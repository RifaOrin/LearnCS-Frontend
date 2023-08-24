import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,Params, useParams } from "react-router-dom";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
const baseUrl = `http://127.0.0.1:8000/course/`;


function ContentShow () {
    const {course_id} = useParams();
    const [quiz, setQuiz] = useState([]);
    const [pdf, setPdf] = useState([]);
    const [video, setVideo] = useState([]);
    const [modules, setModule] = useState([]);
    const [expandedModuleId, setExpandedModuleId] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (videoLink) => {
        setSelectedVideo(videoLink); // Show the selected video
        setSelectedPdf(null); // Close the PDF display
    };

    const handlePdfClick = (pdfTitle) => {
        if (selectedPdf === pdfTitle) {
            setSelectedPdf(null); // Close the PDF display
        } else {
            setSelectedPdf(pdfTitle); // Show the selected PDF content
        }
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

    useEffect(() => {
        
        axios.get(baseUrl +course_id+ "/module").then((response) => {
            setModule(response.data);
        });
    }, []);

     useEffect(() => {
        if (expandedModuleId) {
            axios
                .get(
                    baseUrl + course_id+"/module/" +expandedModuleId +"/quiz/"
                )
                .then((response) => {
                    setQuiz(response.data);
                });

            axios
                .get(
                    baseUrl +course_id+"/module/" +expandedModuleId +"/pdf/"
                )
                .then((response) => {
                    console.log(expandedModuleId);
                    setPdf(response.data);
                });

            axios
                .get(
                    baseUrl + course_id+ "/module/" +expandedModuleId +"/video/"
                )
                .then((response) => {
                    console.log(1);
                    setVideo(response.data);
                });
        }
    }, [expandedModuleId, course_id]);



    return(
        <div className="flex">
        <div className="flex flex-col mr-4"> 
            {modules.map((module) => (
                <div key={module.id} className="mb-4">
                    
                    <Link
                        to="#"
                        onClick={() => toggleModuleDropdown(module.id)}
                    >
                        {module.name}
                    </Link>
                    {expandedModuleId === module.id && (
                        <div>
                            {/* Display the content for the expanded module */}
                            <h3>Quizzes:</h3>
                            <ul>
                                {quiz.map((item) => (
                                    <li key={item.id}>{item.quiz_title}</li>
                                ))}
                            </ul>
                            <h3>PDFs:</h3>
                            <ul>
                                {pdf.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            to="#"
                                            onClick={() =>
                                                handlePdfClick(item.pdf_file)
                                            }
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <h3>Videos:</h3>
                            <ul>
                                {video.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            to="#"
                                            onClick={() =>
                                                handleVideoClick(item.video_file)
                                            }
                                        >
                                        {item.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}
            {selectedPdf && (
                <div>
                    <Document
                        file={selectedPdf}
                        options={{ workerSrc: "/pdf.worker.js" }}
                    >
                        <Page pageNumber={1} />
                    </Document>
                </div>
            )}

            {selectedVideo && (
                <div className="w-1/2 p-6">
                    <video controls className="w-full">
                        <source src={selectedVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
        </div>
    );
}
export default ContentShow; 