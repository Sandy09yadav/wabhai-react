import React from 'react';
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
  return <Container className='container'>
    <SideBar />
    <div className='container2'>
      <ChatList />
      <ChatScreen />
    </div>
  </Container>
}

export default App;
