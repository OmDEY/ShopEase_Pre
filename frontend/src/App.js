import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Main/Common/Navbar';
import Footer from './Components/Main/Common/Footer';
import InfoCards from './Components/Main/Common/InfoCards';
import MainRoutes from './Routes/MainRoutes';
import AdminRoutes from './Routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContextProvider from './Context/ContextProvider';
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/*" element={<MainRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      {!isAdminRoute && <InfoCards />}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ContextProvider>
      <Router>
        <ToastContainer theme='colored' />
        <AppContent />
      </Router>
    </ContextProvider>
  );
}

export default App;