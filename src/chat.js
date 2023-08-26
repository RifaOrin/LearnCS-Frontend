import React, { useState, useEffect } from "react";
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
function Chat(){
    const[messages, setMessages] = useState([])
    const[message, setMessage] = useState("")
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
    const myUsername = 'zisan'
    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot =>{
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    },[])

    async function handleMessage(e){
        e.preventDefault()
        await db.collection('messages').add({
            text: message,
            createdAt: serverTimestamp,
            username: myUsername
        })
        setMessage('')
    }

    return(
        <div>
            {messages.map(({id,text,username}) => (
                <div key={id}>
                    <p>{text} sent by - {username}</p>
                </div>
            ))}

            <form onSubmit={handleMessage}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="type your message" />
                <button type="submit"> Send </button>
            </form>
        </div>
        
    );
}
export default Chat;