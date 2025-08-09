import React, { useState } from "react";
import "./LoginPage.css";
import { loginUser } from "../Services/authservice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => setIsSignIn(!isSignIn);

  /*  const handleLogin = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    toast.error("All fields are required");
    return;
  }

  try {
    const res = await loginUser({ username: email, password });
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res));
    toast.success("Login successful");
    navigate("/dashboard");
  } catch (err) {
    toast.error("Invalid credentials");
  }
};
*/
const handleLogin = (e) => {
  e.preventDefault();
  // Pretend login success
  localStorage.setItem("token", "fake-jwt-token");
  navigate("/dashboard");
   toast.success("Login successful");
};

  return (
    <div className="fullscreen d-flex align-items-center justify-content-center">
      <div className={`login-container ${!isSignIn ? "right-panel-active" : ""}`}>
        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form className="login-form" onSubmit={handleLogin}>
            <h2 style={{color:'black'}}>Sign In</h2>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <form className="login-form">
            <h2 style={{color:'black'}}>Sign Up</h2>
            <input type="text" className="form-control mb-2" placeholder="Username" />
            <input type="email" className="form-control mb-2" placeholder="Email" />
            <input type="password" className="form-control mb-2" placeholder="Password" />
            <button className="btn btn-success w-100" type="button">
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
