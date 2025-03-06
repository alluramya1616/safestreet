import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styleregister.css"; // Updated CSS file

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Successfully Registered! Redirecting to login...");
        setTimeout(() => {
          navigate("/"); 
        }, 500);
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container"> {/* Scoped class */}
      <form onSubmit={handleRegister} id="registerPage">
        <h1>Register</h1>
        <div className="input-box">
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            placeholder="Enter Username" 
            required 
            onChange={handleChange} 
          />
        </div>
        <div className="input-box">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Enter Email" 
            required 
            onChange={handleChange} 
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter Password" required onChange={handleChange} />
        </div>
        <div className="input-box">
          <label>Location</label>
          <input 
            type="text" 
            name="location" 
            placeholder="Enter Location" 
            required 
            onChange={handleChange} 
          />
        </div>
        <button type="submit" className="button">Sign Up</button>
        {message && <p style={{ color: "red" }}>{message}</p>}

        <p className="register">
          Already have an account?  
          <button type="button" onClick={() => navigate("/")}>Login</button> 
        </p>
      </form>
    </div>
  );
}

export default Register;
