import axios from "axios";
import { useEffect, useState } from "react";
import ApprLv2Navbar from "../components/ApprLv2Navbar";
import ApprLv2Sidebar from "../components/ApprLv2Sidebar";

const ApprLv2Shift = () => {
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
    if (username) {
      axios
        .get(`http://localhost:8082/api/attendance/rejected/${username}`)
        .then((response) => setShifts(response.data))
        .catch((error) =>
          console.error("Error fetching rejected attendance data:", error)
        );
    }
  }, [username]);

  const handleFieldChange = (id, field, value) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) =>
        shift.id === id ? { ...shift, [field]: value } : shift
      )
    );
  };

  const handleResubmit = async (shift) => {
    try {
      const response = await axios.put(
        `http://localhost:8082/api/attendance/resubmit/${shift.id}`,
        shift
      );
      alert("Shift resubmitted successfully!");
      setShifts((prevShifts) => prevShifts.filter((s) => s.id !== shift.id));
    } catch (error) {
      console.error("Error resubmitting shift:", error);
      alert("Failed to resubmit shift.");
    }
  };

  const filteredShifts = shifts.filter((shift) =>
    ["name", "serviceNo", "date", "designation"].some((key) =>
      shift[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

 return (
    <div style={styles.wrapper}>
      <ApprLv2Sidebar />
      <div style={styles.mainContent}>
        <ApprLv2Navbar />
        <div style={styles.pageContainer}>
          <div style={styles.formContainer}>
            <h2 style={styles.heading}>Rejected Shifts - Level 2</h2>
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
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredShifts.length > 0 ? (
              filteredShifts.map((shift) => (
                <tr key={shift.id}>
                  <td style={styles.td}>{shift.serviceNo}</td>
                  <td style={styles.td}>
                    <input
                      type="date"
                      value={shift.arrivalDate || ""}
                      onChange={(e) =>
                        handleFieldChange(shift.id, "arrivalDate", e.target.value)
                      }
                      style={styles.inputField}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="time"
                      value={shift.arrivalTime || ""}
                      onChange={(e) =>
                        handleFieldChange(shift.id, "arrivalTime", e.target.value)
                      }
                      style={styles.inputField}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="date"
                      value={shift.departureDate || ""}
                      onChange={(e) =>
                        handleFieldChange(shift.id, "departureDate", e.target.value)
                      }
                      style={styles.inputField}
                    />
                  </td>
                  <td style={styles.td}>
                    <input
                      type="time"
                      value={shift.departureTime || ""}
                      onChange={(e) =>
                        handleFieldChange(shift.id, "departureTime", e.target.value)
                      }
                      style={styles.inputField}
                    />
                  </td>
                  <td style={styles.td}>{shift.designation}</td>
                  <td style={styles.td}>{shift.location}</td>
                  <td style={styles.td}>{shift.name}</td>
                  <td style={styles.td}>{shift.shiftType}</td>
                  <td style={styles.td}>{shift.supervisorNumber}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleResubmit(shift)}
                      style={styles.button}
                    >
                      Resubmit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" style={styles.td}>
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
  inputField: {
    width: "95%",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    textAlign: "center",
  },
  button: {
    padding: "6px 12px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ApprLv2Shift;
