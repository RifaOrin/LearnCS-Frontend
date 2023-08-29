import React, { useState, useEffect, useRef } from "react";
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { IonIcon } from "@ionic/react";
import Navbar from "./navbar";
import axios from "axios";
import { send } from "ionicons/icons";
import { useParams, Link, useNavigate } from "react-router-dom";
const Userurl = "https://kasifzisan.pythonanywhere.com/auth/users/me/";
const baseUrl = `https://kasifzisan.pythonanywhere.com/user/`;

function Chat() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [myUsername, setUsername] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
    const Access = localStorage.accessToken;
    

    useEffect(() => {
        axios
            .get(Userurl, {
                headers: {
                    Authorization: `JWT ${Access}`,
                },
            })
            .then((response) => {
                setUserid(response.data.id);
                axios
                    .get(baseUrl + response.data.id, {
                        headers: {
                            Authorization: `JWT ${Access}`,
                        },
                    })
                    .then((response) => {
                        setUsername(response.data.username);
                    })
                    .catch((error) => {
                        if (
                            error.message ===
                            "Request failed with status code 401"
                        ) {
                            navigate("/login");
                        }
                    });
            })
            .catch((error) => {
                if (error.message === "Request failed with status code 401") {
                    navigate("/login");
                }
            });
            
    }, [Access, navigate]);

    useEffect(() => {
        db.collection("messages")
            .orderBy("createdAt")
            .limit(50)
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
            
    }, []);

    async function handleMessage(e) {
        e.preventDefault();
        await db.collection("messages").add({
            text: message,
            createdAt: serverTimestamp,
            username: myUsername,
        });
        setMessage("");
    }

    return (
        <body className="min-h-screen bg-gradient-to-b from-gray-400 to-gray-950">
            <Navbar />
            <div className="m-3 h-[83vh] max-w-lg mx-auto rounded-lg p-5 shadow-md flex flex-col bg-gradient-to-b from-gray-800 to-gray-950">
                <div
                    
                    className=" overflow-y-auto scrollbar-thin scrollbar-thumb-[#433491] scrollbar-track-gray-400 grow px-4"
                >
                    {messages.map(({ id, text, username }) => (
                        <div
                        key={id}
                        className="flex flex-col"
                    >
                            <span
                                className={`text-sm text-[#888] mb-2 ${
                                    username === myUsername
                                        ? "ml-auto"
                                        : "mr-auto"
                                } `}
                            >
                                {username}
                            </span>

                            <div
                                className={`max-w-xs p-2.5 rounded-full mb-2.5 ${
                                    username === myUsername
                                        ? "bg-[#433491] ml-auto text-white rounded-full font-medium"
                                        : "bg-white text-[#333] font-medium mr-auto"
                                } `}
                            >
                                <p className="px-2 py-1">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <form
                    className="flex grow items-center border-t-2 border-gray-600 py-2 px-4"
                    onSubmit={handleMessage}
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="mt-2 flex-grow border bg-transparent rounded-full text-gray-200 py-3 px-4 font-medium focus:outline-none"
                    />
                    <button type="submit" className="ml-3 mt-2">
                        <IonIcon
                            icon={send}
                            className="text-3xl text-[#433491] hover:text-[#2e2070]"
                        />
                    </button>
                </form>
            </div>
        </body>
    );
}

export default Chat;
