import React, { createContext, useState } from 'react';

export const UserCreateContext = createContext();

export default function UserContext({ children }) {
  
  const [ nameUser, setNameUser ] = useState("")
  const [ messages, setMessages ] = useState([])

  return (
    <UserCreateContext.Provider value={{ nameUser, messages, setNameUser, setMessages }}>
      {children}
    </UserCreateContext.Provider>
  )
}
