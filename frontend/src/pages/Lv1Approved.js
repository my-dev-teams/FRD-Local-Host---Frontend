import axios from "axios";
import { useEffect, useState } from "react";

const Lv1Approved = () => {
  const [shifts, setShifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //const [username, setUsername] = useState("");

  /*useEffect(() => {
    fetch("http://localhost:8082/api/auth/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.text())
      .then((data) => {
        if (data !== "No user logged in") {
          setUsername(data);
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, []);*/

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/attendance/lv1-approved", {
        withCredentials: true,
      })
      .then((response) => setShifts(response.data))
      .catch((error) => console.error("Error fetching approved shifts:", error));
  }, []);

  const filteredShifts = shifts.filter((shift) =>
    ["name", "empId", "date", "designation"].some((key) =>
      shift[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Approved Shifts</h2>
        <input
          type="text"
          placeholder="Search by Name, ID, Date, Designation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />

        <table style={styles.table}>
          <thead>
            <tr>              
              <th style={styles.th}>Arrival Date</th>
              <th style={styles.th}>Arrival Time</th>              
              <th style={styles.th}>Departure Date</th>
              <th style={styles.th}>Departure Time</th>
              <th style={styles.th}>Designation</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Remarks</th>
              <th style={styles.th}>Shift Type</th>
              <th style={styles.th}>Supervisor Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredShifts.length > 0 ? (
              filteredShifts.map((shift) => (
                <tr key={shift.id}>                  
                  <td style={styles.td}>{shift.arrivalDate}</td>
                  <td style={styles.td}>{shift.arrivalTime}</td>                  
                  <td style={styles.td}>{shift.departureDate}</td>
                  <td style={styles.td}>{shift.departureTime}</td>
                  <td style={styles.td}>{shift.designation}</td>
                  <td style={styles.td}>{shift.location}</td>
                  <td style={styles.td}>{shift.name}</td>
                  <td style={styles.td}>{shift.remarks}</td>
                  <td style={styles.td}>{shift.shiftType}</td>
                  <td style={styles.td}>{shift.supervisorNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" style={styles.td}>
                  No approved shifts found.
                </td>
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
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formContainer: {
    width: "95%",
    maxWidth: "1130px",
    padding: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    overflowY: 'scroll',

  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  searchBar: {
    width: "95%",
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
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

export default Lv1Approved;
