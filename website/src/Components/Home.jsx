import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">MyApp</div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About Us</Link>
          <Link to="/help">Help</Link>
          <Link to="/logout">Log Out</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h1>Welcome to MyApp</h1>
        <p>This is the home page where you can find information about our application.</p>
      </main>
    </div>
  );
};

export default HomePage;
