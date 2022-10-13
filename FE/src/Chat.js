import { AttachFile, InsertChartOutlinedOutlined, InsertEmoticon, Keyboard, KeyboardVoice, MoreVert, SearchOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./Chat.css";
import axios from './axios';

function Chat({ messages }) {
    const [input, setInput] = useState('')

    const sendMsg = async (e) => {
        e.preventDefault();
        axios.post('/api/message/new', {
            "message": input,
            "name": "Demo App",
            "timestamp": "Just Now",
            "recieved": false
        })
        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>{"Room name"}</h3>
                    <p>last seen at...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>

            </div>
            <div className="chat__body">
                {messages.map((message) => {
                    return <p className={`chat__message ${message.recieved && 'chat__reciever'} `}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">
                            {message.timestamp}
                        </span>
                    </p>
                })}



            </div>
            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={(e) => {
                        setInput(e.target.value);
                    }}
                        placeholder="Type your message"
                        type="text"
                    />
                    <button type="submit" onClick={sendMsg}>
                        Send a message
                    </button>
                </form>
                <KeyboardVoice />
            </div>
        </div >
    );
}

export default Chat;
