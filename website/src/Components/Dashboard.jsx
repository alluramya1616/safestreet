// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css"; // CSS file for styling

// const Dashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [selectedReport, setSelectedReport] = useState(null);

//   const getBorderClass = (severity) => {
//     if (severity.toLowerCase() === "high") return "border-red";
//     if (severity.toLowerCase() === "neutral") return "border-blue";
//     return "border-green";
//   };

//   // Fetch reports from MongoDB
//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/api/reports");
//         const sortedReports = response.data.sort(
//           (a, b) => new Date(b.dateTime) - new Date(a.dateTime)
//         );
//         setReports(sortedReports);
//       } catch (error) {
//         console.error("Error fetching reports:", error);
//       }
//     };

//     fetchReports();
//   }, []);

//   return (
//     <div className="dashboard-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">SafeStreet</div>
//         <div className="nav-links">
//           <Link to="/home">Home</Link>
//           <Link to="/dashboard">Dashboard</Link>
//           <Link to="/about">About Us</Link>
//           <Link to="/help">Help</Link>
//           <Link to="/" onClick={() => localStorage.removeItem("token")}>
//             Log Out
//           </Link>
//         </div>
//       </nav>

//       <h1 className="dashboard-title">Road Damage Reports</h1>
//       <div className="reports-grid">
//         {reports.map((report) => (
//           <div 
//             key={report._id} 
//             className={`report-card ${getBorderClass(report.severity)}`} 
//             onClick={() => setSelectedReport(report)}
//           >        
//             {/* Left-side Image */}
//             <img src={report.imageUrl} alt="Damage" className="report-image" />

//             {/* Right-side Data Box */}
//             <div className="report-info">
//               <div className="report-date">{new Date(report.dateTime).toLocaleString()}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Detailed View */}
//       {selectedReport && (
//         <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <span className="close-btn" onClick={() => setSelectedReport(null)}>×</span>
//             <h2>Report Details</h2>
//             <img src={selectedReport.imageUrl} alt="Damage" className="modal-image" />
//             <p>
//               <strong>Location:</strong>{" "}
//               <a
//                 href={`https://www.google.com/maps/search/?api=1&query=${selectedReport.latitude},${selectedReport.longitude}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="location-link"
//               >
//                 {selectedReport.location}
//               </a>
//             </p>
//             <p><strong>Type:</strong> {selectedReport.typeOfDamage}</p>
//             <p><strong>Severity:</strong> {selectedReport.severity}</p>
//             <p><strong>Recommended Action:</strong> {selectedReport.recommendedAction}</p>
//           </div>
//         </div>
//       )}
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
  const sortedReports = [...reports].sort((a, b) => {
    if (sortType === "newest") return new Date(b.dateTime) - new Date(a.dateTime);
    if (sortType === "oldest") return new Date(a.dateTime) - new Date(b.dateTime);
    if (sortType === "severity") return b.severity.localeCompare(a.severity);
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
              onClick={() => navigate(`/report/${report._id}`)}
            >
              <img src={report.imageUrl} alt="Damage" className="report-image" />
              <div className="report-info">
                <div className="report-date">{new Date(report.dateTime).toLocaleString()}</div>
                <div className="report-severity">{report.severity.toUpperCase()}</div>
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

