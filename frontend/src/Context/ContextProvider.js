// ContextProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { adminVerifyToken, userVerifyToken } from '../services/api';

export const SearchContext = createContext();

const ContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setLoading(false);

      try {
        const adminResponse = await adminVerifyToken(token);
        if (adminResponse.status === 200) {
          setIsAuthenticated(true);
          setIsAdmin(true);
        } else {
          const userResponse = await userVerifyToken(token);
          if (userResponse.status === 200) {
            setIsAuthenticated(true);
            setIsAdmin(false);
          } else {
            setIsAuthenticated(false);
            setIsAdmin(false);
          }
        }
      } catch {
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin }}>
      {loading ? <div>Loading...</div> : children}
    </SearchContext.Provider>
  );
};

export default ContextProvider;
