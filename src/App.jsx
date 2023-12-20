import React, { useState, useEffect } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import ChatList from './components/ChatList';
import ChatScreen from './components/ChatScreen';
import AuthKeyProvider from './components/AuthKeyProvider';
import AuthKey from './AuthKey';

const Container = ({ children }) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

function App() {
  const [activeChat, setActiveChat] = useState(null);
  const [authKey, setAuthKey] = useState('');
  const [isAuthKeyProvided, setAuthKeyProvided] = useState(false);

  // Retrieve authKey from localStorage on component mount
  useEffect(() => {
    console.log('Component mounted');
    const storedAuthKey = localStorage.getItem('authKey');
    console.log('Stored authKey in localStorage:', storedAuthKey);
    if (storedAuthKey) {
      setAuthKey(storedAuthKey);
      console.log(storedAuthKey, 'AuthKey ka console nhi hai');
      setAuthKeyProvided(true);
      console.log(isAuthKeyProvided, 'Stored key hai');
    } else {
      setAuthKeyProvided(false);
    }
  }, [isAuthKeyProvided]);

  // Update authKey in both state and localStorage
  const handleAuthKeyChange = (newAuthKey) => {
    console.log('Updating authKey:', newAuthKey);
    setAuthKey(newAuthKey);
    localStorage.setItem('authKey', newAuthKey);
    console.log('authKey updated in localStorage');
  };

  return (
    <AuthKeyProvider value={{ authKey }}>
      {isAuthKeyProvided ? (
        <Container className='container'>
          <SideBar handleAuthKeyChange={handleAuthKeyChange} isAuthKeyProvided={isAuthKeyProvided} setAuthKeyProvided={setAuthKeyProvided} />
          <div className='container2'>
            <ChatList setActiveChat={setActiveChat} />
            <ChatScreen activeChat={activeChat} />
          </div>
        </Container>
      ) : (
        <AuthKey isAuthKeyProvided={isAuthKeyProvided} setAuthKeyProvided={setAuthKeyProvided} />
      )}
    </AuthKeyProvider>
  );
}

export default App;
