import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <div className="text-xl font-bold">MyApp</div>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/home" className="hover:underline">Home</Link>
          <Link to="/logout" className="hover:underline">Log Out</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/help" className="hover:underline">Help</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to MyApp</h1>
        <p className="text-lg">This is the home page where you can find information about our application.</p>
      </main>
    </div>
  );
};

export default HomePage;
