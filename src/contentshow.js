import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Params, useParams } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
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
        <div className="flex">
            <div className="flex flex-col mr-4 w-2/3">
                {modules.map((module) => (
                    <div key={module.id} className="mb-4">
                        <Link to="#" onClick={() => toggleModuleDropdown(module.id)}>
                            {module.name}
                        </Link>
                        {expandedModuleId === module.id && (
                            <div>
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
                                            <Link to="#" onClick={() => handlePdfClick(item.pdf_file)}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <h3>Videos:</h3>
                                <ul>
                                    {video.map((item) => (
                                        <li key={item.id}>
                                            <Link to="#" onClick={() => handleVideoClick(item.video_file)}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="w-1/3">
                <h2 className="mb-4">View PDF</h2>
                <div>
                    {selectedPdf && (
                        <div className="border rounded-lg shadow p-4 mb-4">
                            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                                <Viewer fileUrl={selectedPdf} plugins={[newplugin]} />
                            </Worker>
                        </div>
                    )}
                    {!selectedPdf && <div className="text-gray-500 italic">No PDF</div>}
                </div>
                {selectedVideo && (
                    <div className="p-6">
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
