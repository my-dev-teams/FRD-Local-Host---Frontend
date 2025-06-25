import axios from "axios";
import { useEffect, useState } from "react";

const ViewSecurityOfficerForm = () => {
  const [officers, setOfficers] = useState([]);

  // Fetch security officers
  useEffect(() => {
    axios
      .get("http://localhost:8082/api/security-officer")
      .then((response) => {
        setOfficers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching security officers:", error);
      });
  }, []);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Security Officers</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>NIC Number</th>
              <th style={styles.th}>Emp ID</th>
              <th style={styles.th}>Contact Number</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Supervisor</th>
              <th style={styles.th}>Company Name</th>
            </tr>
          </thead>
          <tbody>
            {officers.length > 0 ? (
              officers.map((officer, index) => (
                <tr key={index}>
                  <td style={styles.td}>{officer.name}</td>
                  <td style={styles.td}>{officer.nic}</td>
                  <td style={styles.td}>{officer.empId}</td>
                  <td style={styles.td}>{officer.contactNumber}</td>
                  <td style={styles.td}>{officer.address}</td>
                  <td style={styles.td}>{officer.supervisor ? officer.supervisor.name : "N/A"}</td>
                  <td style={styles.td}>{officer.company ? officer.company.comName : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.td}>No officers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formContainer: {
    width: "80%",
    padding: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    overflowY: 'scroll',

  },
  heading: {
    fontSize: "22px",
    color: "#333",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    backgroundColor: "rgba(159, 195, 242, 0.9)",
    padding: "10px",
    border: "1px solid #ddd",
    fontWeight: "bold",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
};

export default ViewSecurityOfficerForm;
