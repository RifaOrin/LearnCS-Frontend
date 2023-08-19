import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Quizquestion() {
    const { course_id, module_id, quiz_id } = useParams();
    const [quiz, setQuiz] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [correctCount, setCorrectCount] = useState(0); // Initialize count to 0
    const [showPopup, setShowPopup] = useState(false);

    const baseUrl =
        "http://127.0.0.1:8000/course/" +
        course_id +
        "/module/" +
        module_id +
        "/quiz/" +
        quiz_id +
        "/question/";
    const quizAttemptUrl =
        "http://127.0.0.1:8000/course/" +
        course_id +
        "/module/" +
        module_id +
        "/quiz/" +
        quiz_id +
        "/quizAttempt/";
    useEffect(() => {
        axios.get(baseUrl).then((response) => {
            setQuiz(response.data);
            setSelectedOptions(Array(response.data.length).fill(null));
        });
    }, []);

    useEffect(() => {
        // Compare selected options with correct answers and update correct count
        let count = 0;
        quiz.forEach((question, index) => {
            if (selectedOptions[index] === question.correct_answer) {
                count++;
            }
        });
        setCorrectCount(count);
    }, [selectedOptions, quiz]);

    const handleOptionChange = (index, selectedOption) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = [...prevSelectedOptions];
            newSelectedOptions[index] = selectedOption;
            return newSelectedOptions;
        });
    };

    const saveQuizAttempt = async () => {
        const data = {
            user: 1,
            quiz: quiz_id,
            marks_obtained: correctCount,
        };

        try {
            await axios.post(quizAttemptUrl, data);
            setShowPopup(true); // Show the results after saving the attempt
        } catch (error) {
            console.error("Error saving quiz attempt:", error);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-semibold mb-4">Quiz Questions</h1>
                <ul>
                    {quiz.map((question, index) => (
                        <li key={question.id} className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">
                                {question.question}
                            </h2>
                            <form>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value="option1"
                                        checked={
                                            selectedOptions[index] ===
                                            question.option1
                                        }
                                        onChange={() =>
                                            handleOptionChange(
                                                index,
                                                question.option1
                                            )
                                        }
                                    />
                                    {question.option1}
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value="option2"
                                        checked={
                                            selectedOptions[index] ===
                                            question.option2
                                        }
                                        onChange={() =>
                                            handleOptionChange(
                                                index,
                                                question.option2
                                            )
                                        }
                                    />
                                    {question.option2}
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value="option3"
                                        checked={
                                            selectedOptions[index] ===
                                            question.option3
                                        }
                                        onChange={() =>
                                            handleOptionChange(
                                                index,
                                                question.option3
                                            )
                                        }
                                    />
                                    {question.option3}
                                </label>
                                <br />
                                <label>
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value="option4"
                                        checked={
                                            selectedOptions[index] ===
                                            question.option4
                                        }
                                        onChange={() =>
                                            handleOptionChange(
                                                index,
                                                question.option4
                                            )
                                        }
                                    />
                                    {question.option4}
                                </label>
                            </form>
                        </li>
                    ))}
                </ul>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={saveQuizAttempt}
                >
                    Submit Answers
                </button>
                <Link
                    className="block mt-4 text-blue-500 hover:underline"
                    to="/"
                >
                    Go back
                </Link>
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">
                            Quiz Results
                        </h2>
                        <p className="mb-2">Your Answers:</p>
                        <ul className="mb-4">
                            {quiz.map((question, index) => (
                                <li key={question.id}>
                                    <p>
                                        Question {index + 1}:{" "}
                                        {selectedOptions[index]}
                                        {selectedOptions[index] ===
                                        question.correct_answer ? (
                                            <span className="text-green-500 ml-2">
                                                Correct
                                            </span>
                                        ) : (
                                            <span className="text-red-500 ml-2">
                                                Incorrect
                                            </span>
                                        )}
                                    </p>
                                    <p>
                                        Correct Answer:{" "}
                                        {question.correct_answer}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <p className="mb-2">Correct Answers: {correctCount}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setShowPopup(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quizquestion;
