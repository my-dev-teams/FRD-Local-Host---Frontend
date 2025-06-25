import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PendingLv2Approvals = () => {
  const [shifts, setShifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShifts, setSelectedShifts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [username, setUsername] = useState('');
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [remarkInput, setRemarkInput] = useState('');

  const navigate = useNavigate();

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
    fetchApprovedLv1Attendance();
  }, []);

  const fetchApprovedLv1Attendance = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/attendance/lv1-approved');
      setShifts(response.data);
    } catch (error) {
      console.error("Error fetching approved attendance:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedShifts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedShifts([]);
    } else {
      setSelectedShifts(shifts.map(shift => shift.id));
    }
    setSelectAll(!selectAll);
  };

  const handleApprove = () => {
    if (selectedShifts.length === 0) {
      alert("No shifts selected for approval.");
      return;
    }

    const approvedShifts = shifts.filter(shift => selectedShifts.includes(shift.id));
    const approvalData = approvedShifts.map(shift => ({
      nicNumber: shift.nic,
      officerType: "Lv2Approver",
      officerId: username,
      action: "Lv2 Approved",
      timeStamp: new Date().toISOString(),
      remarks: shift.remarks || ""
    }));

    axios.post("http://localhost:8082/api/approve-process/bulk", approvalData)
      .then(() => {
        alert(`Approved shifts: ${selectedShifts.join(", ")}`);
        setShifts(shifts.filter(shift => !selectedShifts.includes(shift.id)));
        setSelectedShifts([]);
      })
      .catch(error => console.error("Error approving shifts:", error));
  };

  const handleReject = () => {
    if (selectedShifts.length === 0) {
      alert("No shifts selected for rejection.");
      return;
    }
    setShowRemarkModal(true);
  };

  const submitRejection = () => {
    const rejectedShifts = shifts.filter(shift => selectedShifts.includes(shift.id));
    const rejectData = rejectedShifts.map(shift => ({
      nicNumber: shift.nic,
      officerType: "Lv2Approver",
      officerId: username,
      action: "Lv2 Rejected",
      timeStamp: new Date().toISOString(),
      remarks: remarkInput
    }));

    axios.post("http://localhost:8082/api/approve-process/bulk", rejectData)
      .then(() => {
        alert(`Rejected shifts: ${selectedShifts.join(", ")}`);
        setShifts(shifts.filter(shift => !selectedShifts.includes(shift.id)));
        setSelectedShifts([]);
        setRemarkInput('');
        setShowRemarkModal(false);
        navigate("/ApprL2");
      })
      .catch(error => console.error("Error rejecting shifts:", error));
  };

  const filteredShifts = shifts.filter(shift =>
    ['name', 'nic', 'id', 'date', 'designation'].some(key =>
      shift[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Pending Approvals (Level 2)</h2>
        <input
          type="text"
          placeholder="Search by Name, ID, Date, Designation, or other details..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
        <div style={{ marginBottom: "20px" }}>
          <button style={styles.approveButton} onClick={handleApprove}>
            Approve Selected
          </button>
          <button style={styles.rejectButton} onClick={handleReject}>
            Reject Selected
          </button>
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>NIC</th>
              <th style={styles.th}>Designation</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Arrival Date</th>
              <th style={styles.th}>Arrival Time</th>
              <th style={styles.th}>Departure Date</th>
              <th style={styles.th}>Departure Time</th>
              <th style={styles.th}>Attendance</th>
              <th style={styles.th}>Shift Type</th>
              <th style={styles.th}>Remarks</th>
              <th style={styles.th}>Supervisor Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredShifts.length > 0 ? (
              filteredShifts.map((shift) => (
                <tr key={shift.id}>
                  <td style={styles.td}>
                    <input
                      type="checkbox"
                      checked={selectedShifts.includes(shift.id)}
                      onChange={() => handleCheckboxChange(shift.id)}
                    />
                  </td>
                  <td style={styles.td}>{shift.name}</td>
                  <td style={styles.td}>{shift.nic}</td>
                  <td style={styles.td}>{shift.designation}</td>
                  <td style={styles.td}>{shift.location}</td>
                  <td style={styles.td}>{shift.arrivalDate}</td>
                  <td style={styles.td}>{shift.arrivalTime}</td>
                  <td style={styles.td}>{shift.departureDate}</td>
                  <td style={styles.td}>{shift.departureTime}</td>
                  <td style={styles.td}>{shift.present}</td>
                  <td style={styles.td}>{shift.shiftType}</td>
                  <td style={styles.td}>{shift.remarks}</td>
                  <td style={styles.td}>{shift.supervisorNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" style={styles.td}>No shifts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Remarks */}
      {showRemarkModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Enter Remark for Rejection</h3>
            <textarea
              value={remarkInput}
              onChange={e => setRemarkInput(e.target.value)}
              style={modalStyles.textarea}
              placeholder="Enter your remark here..."
            />
            <div style={modalStyles.buttonRow}>
              <button style={modalStyles.confirmButton} onClick={submitRejection}>Confirm Reject</button>
              <button style={modalStyles.cancelButton} onClick={() => setShowRemarkModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: "url('background.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    width: '95%',
    maxWidth: '1130px',
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    overflowY: 'scroll',

  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  searchBar: {
    width: '95%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  approveButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  rejectButton: {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    marginLeft: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    backgroundColor: 'rgba(159, 195, 242, 0.9)',
    padding: '10px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
  }
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: '#fff',
    padding: '30px',
    borderRadius: '8px',
    width: '350px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    textAlign: 'center'
  },
  textarea: {
    width: '100%',
    minHeight: '70px',
    margin: '15px 0',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '15px'
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  confirmButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#aaa',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    cursor: 'pointer'
  }
};

export default PendingLv2Approvals;
