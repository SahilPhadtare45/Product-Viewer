import './App.css';
import LoginPage from './Pages/LoginPage';
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Services/PrivateRoute";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Services/firebase";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
