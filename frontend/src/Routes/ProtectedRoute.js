// ProtectedRoute.js
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../Context/ContextProvider';
import { adminVerifyToken, userVerifyToken } from '../services/api';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useContext(SearchContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return redirectToAuth();

      try {
        const response = adminOnly ? await adminVerifyToken(token) : await userVerifyToken(token);
        if (response.status === 200) {
          setIsAuthenticated(true);
          setIsAdmin(adminOnly);
        } else {
          redirectToAuth();
        }
      } catch {
        redirectToAuth();
      } finally {
        setLoading(false);
      }
    };

    const redirectToAuth = () => {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setLoading(false);
      navigate('/auth');
    };

    verifyToken();
  }, [adminOnly, navigate, setIsAuthenticated, setIsAdmin]);

  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;