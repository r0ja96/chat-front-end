
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";
import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const socket = io.connect('http://localhost:4000');
const id = v4();

function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="/chat" element={<Chat socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
