import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
