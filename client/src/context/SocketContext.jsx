import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(process.env.NODE_ENV === 'production'
      ? "https://smile-estate-app.onrender.com"
      : "http://localhost:4000");
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    currentUser && socket?.emit("newUser", currentUser.id);
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }} >
      {children}
    </SocketContext.Provider>
  );
}