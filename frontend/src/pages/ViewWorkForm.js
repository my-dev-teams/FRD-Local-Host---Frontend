import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import CompanySidebar from '../components/CompanySidebar';
import CompanyUserNavbar from '../components/CompanyUserNavbar';

const ViewWorkForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [workData, setWorkData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch session username
    fetch("http://localhost:8082/api/auth/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.text())
      .then((data) => {
        if (data !== "No user logged in") {
          setUsername(data);

          // Once username is confirmed, fetch work data
          fetch("http://localhost:8082/api/work-log/view", {
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              setWorkData(data);
            })
            .catch((err) => console.error("Error fetching work data:", err));
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  const filteredData = workData.filter(item => {
    const matchesSearch =
      ['name', 'nic', 'empId', 'companyName'].some(key =>
        String(item[key] ?? '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    const matchesMonth = selectedMonth ? item.month === selectedMonth : true;
    return matchesSearch && matchesMonth;
  });

  const handleDownload = () => {
    const doc = new jsPDF();
    const now = new Date();
    const formattedDate = now.toLocaleString();

    const companyName = filteredData[0]?.companyName || 'Company';

    // Add Logo (if you have a base64 image or public URL)
    const logoUrl = "/logo.png"; // Must be base64 or publicly accessible path

    const img = new window.Image();
    img.src = logoUrl;
    img.onload = () => {
      doc.addImage(img, 'PNG', 14, 10, 30, 15); // x, y, width, height

      // Title
      doc.setFont("helvetica", "bold"); // Set font to bold
      doc.setFontSize(16);
      doc.text("Security Attendance Report - Monthly", 50, 18);

      doc.setFontSize(11);
      doc.text(`Company Name - ${companyName}`, 50, 25);

      doc.setFontSize(11);
      doc.text(`Downloaded on: ${formattedDate}`, 50, 32);

      // Table Headers
      const tableColumn = ["Name", "NIC", "Emp ID", "Supervisor", "Work Hours", "Month", "Company Name"];
      const tableRows = filteredData.map(item => [
        item.name || '-', item.nic || '-', item.empId || '-', item.supervisor || '-', item.workHours ?? '-', item.month || '-', item.companyName || '-'
      ]);

      // Add Table
      autoTable(doc, {
        startY: 40,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [92, 158, 245] },
      });

      doc.save(`Security_Attendance_Report_${companyName}_${now.toISOString().slice(0,10)}.pdf`);
    };
  };

  return (
    <div style={styles.pageContainer}>
      <CompanyUserNavbar />
      <CompanySidebar />

      <div style={styles.formContainer}>
        <h2 style={styles.heading}>View Work</h2>

        <div style={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search by Name, NIC, Emp ID, Company Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchBar}
          />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={styles.monthPicker}
          />
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>NIC</th>
              <th style={styles.th}>Emp ID</th>
              <th style={styles.th}>Supervisor</th>
              <th style={styles.th}>Work Hours</th>
              <th style={styles.th}>Month</th>
              <th style={styles.th}>Company Name</th>
              
              
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{item.name || '-'}</td>
                  <td style={styles.td}>{item.nic || '-'}</td>
                  <td style={styles.td}>{item.empId || '-'}</td>
                  <td style={styles.td}>{item.supervisor || '-'}</td>
                  <td style={styles.td}>{item.workHours ?? '-'}</td>
                  <td style={styles.td}>{item.month || '-'}</td>
                  <td style={styles.td}>{item.companyName || '-'}</td>                 
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={styles.noData}>No work records found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <button onClick={handleDownload} style={styles.downloadButton}>
          Download Report
        </button>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    backgroundImage: "url('/background.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  formContainer: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0,0,0,0.2)',
    overflowY: 'scroll',

  },
  heading: {
    fontSize: '28px',
    color: 'black',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  searchBar: {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  monthPicker: {
    width: '100%',
    maxWidth: '200px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
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
  downloadButton: {
    backgroundColor: '#1b1988',
    color: 'white',
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'block',
    margin: '20px auto 0',
    transition: 'background-color 0.3s ease',
  },
};

export default ViewWorkForm;
