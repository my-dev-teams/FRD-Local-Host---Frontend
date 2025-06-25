import { useEffect, useState } from 'react';
import axios from 'axios';

const ApprovalHistoryL2 = () => {
  const [shifts, setShifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [officerTypeFilter, setOfficerTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);

  const fetchShifts = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/approve-process');
      const data = response.data.map(item => ({
        nic: item.nicNumber,
        officerType: item.officerType,
        officerId: item.officerId,
        action: item.action,
        remarks: item.remarks,
        timeStamp: item.timeStamp,
      }));
      setShifts(data);
    } catch (error) {
      console.error('Error fetching shift data:', error);
    }
  };

  const filteredShifts = shifts.filter(shift =>
    (['nic', 'officerType', 'officerId', 'action', 'remarks'].some(key =>
      shift[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    ) &&
    (officerTypeFilter ? shift.officerType === officerTypeFilter : true) &&
    (dateFilter ? shift.timeStamp?.split('T')[0] === dateFilter : true)
  );

  useEffect(() => {
    fetchShifts();
  }, []);

  const handleDownload = () => {
    const csvContent = [
      ['NIC', 'Officer Type', 'Officer ID', 'Action', 'Remarks', 'Time Stamp'],
      ...filteredShifts.map(row =>
        [row.nic, row.officerType, row.officerId, row.action, row.remarks, row.timeStamp]
      ),
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "approval_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Approval History</h2>

        <div style={styles.filtersRow}>
          <input
            type="text"
            placeholder="Search by NIC, Officer Type, ID, Action, or Remarks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchBar}
          />

          <select
            value={officerTypeFilter}
            onChange={(e) => setOfficerTypeFilter(e.target.value)}
            style={styles.select}
          >
            <option value="">Officer Types</option>
            <option value="petrolleader">Petrol Leader</option>
            <option value="security manager">Security Manager</option>
            <option value="approver level 1">Approver Level 1</option>
            <option value="approver level 2">Approver Level 2</option>
            <option value="approver level 3">Approver Level 3</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={styles.datePicker}
          />
        </div>

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
                  <td style={styles.td}>{shift.timeStamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.noData}>No approval history found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <button style={styles.downloadBtn} onClick={handleDownload}>
          Download
        </button>
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
    paddingLeft: "280px",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    width: '85%',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    overflowY: 'scroll',
    maxHeight: '90vh',
  },
  heading: {
    fontSize: '24px',
    color: 'black',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  filtersRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginBottom: '20px',
  },
  searchBar: {
    flex: '1',
    minWidth: '180px',
    padding: '7px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  select: {
    padding: '7px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  datePicker: {
    padding: '7px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
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
  downloadBtn: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#5c9ef5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ApprovalHistoryL2;
