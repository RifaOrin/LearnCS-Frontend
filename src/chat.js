import React, { useState, useEffect } from "react";
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import './chatstyle.css'; // Import your styles here

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
    const myUsername = 'Maruf';

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()));
        });
    }, []);

    async function handleMessage(e) {
        e.preventDefault();
        await db.collection('messages').add({
            text: message,
            createdAt: serverTimestamp,
            username: myUsername
        });
        setMessage('');
    }

    return (
        <div className="chat-container flex flex-col h-screen bg-gray-100">
        <div className="chat-messages overflow-y-auto flex-grow px-4">
            {messages.map(({ id, text, username }) => (
                 
                <div
                    key={id}
                    className={`message ${
                        username === myUsername ? 'my-message' : 'other-message'
                    }`}
                >
                   
                   {username !== myUsername && <span className="message-sender">{username}</span>}
                   {username === myUsername && <span className="message-sender">{username}</span>}
                    <p className="px-2 py-1">{text}</p>
                </div>
            ))}
        </div>
    
        <form
            className="chat-input flex items-center border-t-2 border-gray-200 py-2 px-4"
            onSubmit={handleMessage}
        >
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border border-gray-300 rounded-full py-1 px-3 focus:outline-none"
            />
            <button
                type="submit"
                className="ml-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-1 focus:outline-none"
            >
                Send
            </button>
        </form>
    </div>
    
    );
}

export default Chat;
