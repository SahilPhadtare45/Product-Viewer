import './App.css';
import LoginPage from './Pages/LoginPage';
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Services/PrivateRoute";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}
              />
            </Routes>
          </Router>
    </>
    
    
  );
}

export default App;
