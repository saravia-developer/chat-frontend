import "./App.css";
import JoinChat from "./components/Join-Chat/JoinChat";
import Chat from "./components/chat/Chat";
import { io } from "socket.io-client";
import { environments } from "./environments/environments";


function App() {
  const socket = io(`${environments.BASE_URL}`);

  return (
    <>
      <JoinChat />
      <Chat socket={socket} />
    </>
  );
}

export default App;
