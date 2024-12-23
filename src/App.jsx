import { useEffect, useState } from "react";
import "./App.css";
import JoinChat from "./components/Join-Chat/JoinChat";
import Chat from "./components/chat/Chat";
import { io } from "socket.io-client";


function App() {

  useEffect(() => {
    console.log("clear")
  }, [])
  const socket = io("http://localhost:3001");

  return (
    <>
      <JoinChat />
      <Chat socket={socket} />
    </>
  );
}

export default App;
