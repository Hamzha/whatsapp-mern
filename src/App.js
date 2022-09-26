import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function App() {
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
