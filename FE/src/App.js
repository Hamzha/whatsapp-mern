import { useEffect } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from 'pusher-js'

function App() {
  useEffect(() => {
    const pusher = new Pusher('dbd84638dac8e73be809', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function (data) {
      alert(JSON.stringify(data));
    });
  }, [])

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        {/* Sidebar Component*/}
        <Chat />
        {/* Chat Component */}
      </div>
    </div>
  );
}

export default App;
