import { AttachFile, InsertChartOutlinedOutlined, InsertEmoticon, Keyboard, KeyboardVoice, MoreVert, SearchOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import "./Chat.css";
function Chat({ messages }) {

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
                    <input
                        placeholder="Type your message"
                        type="text"
                    />
                    <button type="submit">
                        Send a message
                    </button>
                </form>
                <KeyboardVoice />
            </div>
        </div >
    );
}

export default Chat;
