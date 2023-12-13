import React, { useState } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import ChatList from './components/ChatList';
import ChatScreen from './components/ChatScreen';

const Container = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

function App() {
  const [activeChat, setActiveChat] = useState(null);

  return <Container className='container'>
    <SideBar />
    <div className='container2'>
      <ChatList setActiveChat={setActiveChat} />
      <ChatScreen activeChat={activeChat} />
    </div>
  </Container>
}

export default App;
