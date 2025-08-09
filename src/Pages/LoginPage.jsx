import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../Services/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleToggle = () => setIsSignIn(!isSignIn);

  // Email validation
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation
const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(password);
};

  const handleLogin = async (e) => {
  e.preventDefault();

  // Email validation
  if (!validateEmail(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  // Password validation (optional for login, but good to check)
  if (!password) {
    toast.error("Please enter your password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful! Redirecting...");
    navigate("/dashboard", { replace: true });
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      toast.error("Incorrect password. Please try again.");
    } else if (error.code === "auth/user-not-found") {
      toast.error("No account found with this email.");
    } else {
      toast.error("Login failed. Please try again.");
    }
  }
};


  // Sign Up with Firebase
  const handleSignup = async (e) => {
  e.preventDefault();

  // Email validation
  if (!validateEmail(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

  // Password validation
  if (!validatePassword(password)) {
    toast.error(
      "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
    );
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    toast.success("Signup successful! Redirecting...");
    navigate("/dashboard", { replace: true });
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("Email already in use. Try logging in.");
    } else {
      toast.error("Signup failed. Please try again.");
    }
  }
};


  return (
    <div className="fullscreen d-flex align-items-center justify-content-center">
      <div className={`login-container ${!isSignIn ? "right-panel-active" : ""}`}>
        
        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2 style={{color:'black'}}>Sign In</h2>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-100" type="submit">
              Sign In
            </button>
          </form>
        </div>

        {/* Sign Up */}
        <div className="form-container sign-up-container">
          <form className="login-form" onSubmit={handleSignup}>
            <h2 style={{color:'black'}}>Sign Up</h2>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-success w-100" type="submit">
              Sign Up
            </button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Already have an account?</h2>
              <p>Sign in to continue your journey.</p>
              <button className="btn btn-outline-light" onClick={handleToggle}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start your journey with us</p>
              <button className="btn btn-outline-light" onClick={handleToggle}>
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
