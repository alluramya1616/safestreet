import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Make sure Home.css is correctly imported

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove stored token
    navigate("/"); // Redirect to login
  };

  return (
    <div>
      {/* Scoped Navbar */}
      <div className="home-navbar">
        <h1>Welcome</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Scoped Home Page Content */}
      <div className="home-container">
        <h2>Welcome to the Home Page</h2>
        <p>You have successfully logged in.</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
