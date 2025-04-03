import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ReportDetails.css"; // Add CSS for styling

const ReportDetails = () => {
  const { id } = useParams(); // Get _id from URL
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        console.log("Fetching report with ID:", id); // Debugging
        const response = await axios.get(`http://localhost:8000/api/reports/${id}`);
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching report:", error);
        setError("Failed to load report details.");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);
  

  if (loading) return <p>Loading report details...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="report-details-page">  {/* Unique class for styling */}
      <div className="report-details-container">
        <h1>Report Details</h1>
        <p><strong>Report ID:</strong> {report._id}</p>
        <img
          src={report.imageUrl || "/default-image.png"}
          alt="Damage"
          className="report-image"
        />
        <p><strong>Date:</strong> {new Date(report.dateTime).toLocaleString()}</p>
        <p><strong>Severity:</strong> {report.severity || "Unknown"}</p>
        <p><strong>Type of Damage:</strong> {report.typeOfDamage || "Not specified"}</p>
        <p><strong>Location:</strong> {report.location || "Not specified"}</p>
        <p><strong>Recommended Action:</strong> {report.recommendedAction || "No action recommended"}</p>
      </div>
    </div>
  );
  
};

export default ReportDetails;
