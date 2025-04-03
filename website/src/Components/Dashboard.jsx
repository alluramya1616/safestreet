
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css"; // Ensure CSS file is styled properly

// const Dashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortType, setSortType] = useState("newest");
//   const navigate = useNavigate();

//   // Function to apply border color based on severity
//   const getBorderClass = (severity) => {
//     switch (severity.toLowerCase()) {
//       case "high":
//         return "border-red";
//       case "moderate":
//         return "border-yellow";
//       case "low":
//         return "border-green";
//       default:
//         return "border-blue";
//     }
//   };

//   // Fetch reports from backend
//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/reports");
//         setReports(response.data);
//       } catch (error) {
//         setError("Failed to load reports.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, []);

//   // Sorting logic
//   const sortedReports = [...reports].sort((a, b) => {
//     if (sortType === "newest") return new Date(b.dateTime) - new Date(a.dateTime);
//     if (sortType === "oldest") return new Date(a.dateTime) - new Date(b.dateTime);
//     if (sortType === "severity") return b.severity.localeCompare(a.severity);
//   });

//   return (
//     <div className="dashboard-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">SafeStreet</div>
//         <div className="nav-links">
//           <Link to="/home">Home</Link>
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/about">About</Link>
//           <Link to="/help">Help</Link>
//           <Link to="/" onClick={() => localStorage.removeItem("token")}>Log Out</Link>
//         </div>
//       </nav>

//       <h1 className="dashboard-title">Road Damage Reports</h1>

//       {/* Sorting Options */}
//       <div className="sort-options">
//         <label>Sort by: </label>
//         <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
//           <option value="newest">Newest First</option>
//           <option value="oldest">Oldest First</option>
//           <option value="severity">Severity (High to Low)</option>
//         </select>
//       </div>

//       {/* Loading & Error Messages */}
//       {loading && <p className="loading-text">Loading reports...</p>}
//       {error && <p className="error-text">{error}</p>}

//       {/* Reports Grid */}
//       <div className="reports-grid">
//         {sortedReports.length > 0 ? (
//           sortedReports.map((report) => (
//             <div
//               key={report._id}
//               className={`report-card ${getBorderClass(report.severity)}`}
//               onClick={() => navigate(`/report/${report._id}`)}
//             >
//               <img src={report.imageUrl} alt="Damage" className="report-image" />
//               <div className="report-info">
//                 <div className="report-date">{new Date(report.dateTime).toLocaleString()}</div>
//                 <div className="report-severity">{report.severity.toUpperCase()}</div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="no-reports-text">No reports found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css"; // Ensure CSS file is styled properly

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("newest");
  const navigate = useNavigate();

  // Function to apply border color based on severity
  const getBorderClass = (severity) => {
    if (!severity) return "border-blue"; // Default for missing severity
    switch (severity.toLowerCase()) {
      case "high":
        return "border-red";
      case "moderate":
        return "border-yellow";
      case "low":
        return "border-green";
      default:
        return "border-blue";
    }
  };

  // Fetch reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/reports");
        setReports(response.data);
      } catch (error) {
        setError("Failed to load reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Sorting logic
  const severityLevels = { High: 3, Moderate: 2, Low: 1, null: 0 };

  const sortedReports = [...reports].sort((a, b) => {
    if (sortType === "newest") return new Date(b.dateTime) - new Date(a.dateTime);
    if (sortType === "oldest") return new Date(a.dateTime) - new Date(b.dateTime);
    if (sortType === "severity") return severityLevels[b.severity] - severityLevels[a.severity];
  });

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">SafeStreet</div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
          <Link to="/help">Help</Link>
          <Link to="/" onClick={() => localStorage.removeItem("token")}>Log Out</Link>
        </div>
      </nav>

      <h1 className="dashboard-title">Road Damage Reports</h1>

      {/* Sorting Options */}
      <div className="sort-options">
        <label>Sort by: </label>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="severity">Severity (High to Low)</option>
        </select>
      </div>

      {/* Loading & Error Messages */}
      {loading && <p className="loading-text">Loading reports...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Reports Grid */}
      <div className="reports-grid">
        {sortedReports.length > 0 ? (
          sortedReports.map((report) => (
            <div
              key={report._id}
              className={`report-card ${getBorderClass(report.severity)}`}
              onClick={() => navigate(`/report/${report._id}`)} // ✅ Fixed navigation
            >
              <img src={report.imageUrl} alt="Damage" className="report-image" />
              <div className="report-info">
                <div className="report-date">{new Date(report.dateTime).toLocaleString()}</div>
                <div className="report-severity">{report.severity ? report.severity.toUpperCase() : "UNKNOWN"}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-reports-text">No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
