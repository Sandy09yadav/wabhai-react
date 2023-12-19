import React, { createContext, useContext, useState } from 'react';

const AuthKeyContext = createContext();

export const AuthKeyProvider = ({ children, value: initialValue }) => {
  const [authKey, setAuthKey] = useState(() => localStorage.getItem('authKey') || '');

  const updateAuthKey = (newAuthKey) => {
    setAuthKey(newAuthKey);
  };

  return (
    <AuthKeyContext.Provider value={{ authKey, updateAuthKey }}>
      {children}
    </AuthKeyContext.Provider>
  );
};

export const useAuthKey = () => {
  const context = useContext(AuthKeyContext);
  if (!context) {
    throw new Error('useAuthKey must be used within an AuthKeyProvider');
  }
  return context;
};

export default AuthKeyProvider;