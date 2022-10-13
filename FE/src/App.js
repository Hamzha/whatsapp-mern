import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from 'pusher-js'
import axios from './axios'

function App() {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    axios.get('/api/message/sync').then((response) => {
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('dbd84638dac8e73be809', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (newMessage) {
      if (messages.length >= 1) {
        setMessages([...messages, newMessage])
      }
    });
    // eslint-disable-next-line no-unused-expressions
    () => {
      channel.unbind_all();
      channel.unsubscribe();
    }

  }, [messages])


  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        {/* Sidebar Component*/}
        <Chat messages={messages} />
        {/* Chat Component */}
      </div>
    </div>
  );
}

export default App;
