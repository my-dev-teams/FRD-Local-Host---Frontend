import { useState } from 'react';

const TimeCardStatusL1 = () => {
  const [shifts, setShifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShifts = shifts.filter(shift =>
    ['nic', 'officerType', 'officerId', 'action', 'remarks'].some(key =>
      shift[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Time Card Status (Level 1)</h2>
        <input
          type="text"
          placeholder="Search by NIC, Officer Type, ID, Action, or Remarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>NIC Number</th>
              <th style={styles.th}>Officer Type</th>
              <th style={styles.th}>Officer ID</th>
              <th style={styles.th}>Action</th>
              <th style={styles.th}>Remarks</th>
              <th style={styles.th}>Time Stamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredShifts.length > 0 ? (
              filteredShifts.map((shift, index) => (
                <tr key={index}>
                  <td style={styles.td}>{shift.nic}</td>
                  <td style={styles.td}>{shift.officerType}</td>
                  <td style={styles.td}>{shift.officerId}</td>
                  <td style={styles.td}>{shift.action}</td>
                  <td style={styles.td}>{shift.remarks}</td>
                  <td style={styles.td}>{shift.timeStamp}</td> {/* Added missing timeStamp */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.noData}>No time card status records found.</td>
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: "url('background.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    width: '80%',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    overflowY: 'scroll',

  },
  heading: {
    fontSize: '24px',
    color: 'black',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  searchBar: {
    width: '100%',
    padding: '9px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: 'rgba(92, 158, 245, 0.9)',
    color: 'black',
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '16px',
  },
  noData: {
    padding: '12px',
    textAlign: 'center',
    fontSize: '16px',
    fontStyle: 'italic',
    color: '#888',
  },
};

export default TimeCardStatusL1;
