import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
  // Restore the login state from sessionStorage so a page refresh does not log the user out
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('auth-token'));
  const [userName, setUserName] = useState(sessionStorage.getItem('name') || "");

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
