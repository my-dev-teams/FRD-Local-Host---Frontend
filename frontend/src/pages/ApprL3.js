import axios from "axios";
import { useEffect, useState } from "react";
import ApprLv3Navbar from "../components/ApprLv3Navbar";
import ApprLv3Sidebar from "../components/ApprLv3SideBar";

const ApprL3 = () => {
  const [shifts, setShifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!username) return;
    axios
      .get(`http://localhost:8082/api/attendance/rejected-3/${username}`)
      .then((response) => setShifts(response.data))
      .catch((error) =>
        console.error("Error fetching rejected attendance data:", error)
      );
  }, [username]);

  const filteredShifts = shifts.filter((shift) =>
    ["name", "nic", "arrivalDate", "designation", "remarks"].some((key) =>
      shift[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={styles.wrapper}>
      <ApprLv3Sidebar />
      <div style={styles.mainContent}>
        <ApprLv3Navbar />
        <div style={styles.pageContainer}>
          <div style={styles.formContainer}>
            <h2 style={styles.heading}>Rejected Shifts - Level 3</h2>
            <input
              type="text"
              placeholder="Search by Name, ID, Date, Designation, Rejected Reason..."
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
                  <th style={styles.th}>Shift Type</th>
                  <th style={styles.th}>Supervisor Number</th>
                  <th style={styles.th}>Rejected Reason</th>
                  <th style={styles.th}>Remarks</th>
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
                      <td style={styles.td}>{shift.shiftType}</td>
                      <td style={styles.td}>{shift.supervisorNumber}</td>
                      <td style={styles.td}>{shift.rejectedReason || "N/A"}</td>
                      <td style={styles.td}>{shift.remarks || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" style={styles.td}>
                      No rejected shifts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "30px",
  },
  formContainer: {
    width: "95%",
    maxWidth: "1130px",
    padding: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
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
    backgroundColor: "rgba(159, 214, 242, 0.9)",
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

export default ApprL3;
