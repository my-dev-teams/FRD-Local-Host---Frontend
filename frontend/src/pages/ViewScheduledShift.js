import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";

const ViewScheduledShift = () => {
    const [shifts, setShifts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [username, setUsername] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        fetch("http://localhost:8082/api/attendance/all")
            .then((response) => response.json())
            .then((data) => setShifts(data))
            .catch((error) => console.error("Error fetching shifts:", error));
    }, []);

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

    const filteredShifts = shifts.filter(shift =>
        shift.supervisorNumber === username &&
        shift.arrivalDate === selectedDate &&
        ["id", "name", "location", "shiftType"].some(key =>
            shift[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const downloadPDF = () => {
        const doc = new jsPDF();
        const logo = new Image();
        logo.src = "/logo.png"; // Make sure logo.png is in public/

        logo.onload = () => {
            doc.addImage(logo, "PNG", 10, 10, 35, 25);
            doc.setFontSize(16);
            doc.text("Security Attendance Report", 70, 20);
            doc.setFontSize(11);
            doc.text(`Supervisor Number: ${username}`, 140, 28);
            doc.text(`Downloaded Date: ${new Date().toLocaleString()}`, 140, 35);

            const columns = [
                "Name", "NIC", "Designation", "Location", "Arrival Date", "Arrival Time",
                "Departure Date", "Departure Time", "Attendance", "Shift Type", "Remarks"
            ];
            const rows = filteredShifts.map(shift => [
                shift.name, shift.nic, shift.designation, shift.location,
                shift.arrivalDate, shift.arrivalTime,
                shift.departureDate, shift.departureTime,
                shift.present, shift.shiftType, shift.remarks
            ]);

            autoTable(doc, {
                startY: 45,
                head: [columns],
                body: rows,
                styles: { fontSize: 8, halign: 'center' },
                didDrawPage: (data) => {
                    const pageCount = doc.internal.getNumberOfPages();
                    const pageSize = doc.internal.pageSize;
                    const pageHeight = pageSize.height;
                    doc.setFontSize(10);
                    doc.text(`Page ${data.pageNumber} of ${pageCount}`, pageSize.width / 2, pageHeight - 10, { align: "center" });
                }
            });

            // Add current date to filename
            const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
            doc.save(`Security_Attendance_Report_${currentDate}.pdf`);
        };
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Scheduled Shifts</h2>

                <div style={styles.filtersContainer}>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{ ...styles.searchBar, width: "30%" }}
                    />
                    <input
                        type="text"
                        placeholder="Search by ID, Name, Location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ ...styles.searchBar, width: "50%" }}
                    />
                    <button onClick={downloadPDF} style={styles.downloadButton}>
                        Download PDF
                    </button>
                </div>

                <table style={styles.table}>
                    <thead>
                        <tr>
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
                            filteredShifts.map((shift, index) => (
                                <tr key={index}>
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
                                <td colSpan="13" style={styles.td}>No shifts found.</td>
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
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingLeft: "280px",
    },
    formContainer: {
        width: '90%',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        overflowY: 'scroll',

    },
    heading: {
        fontSize: '22px',
        color: '#333',
        marginBottom: '20px',
    },
    filtersContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
        alignItems: "center"
    },
    searchBar: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    downloadButton: {
        padding: '10px 20px',
        backgroundColor: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        height: '40px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        margin: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    th: {
        backgroundColor: 'rgba(159, 195, 242, 0.9)',
        padding: '6px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    td: {
        padding: '6px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }
};

export default ViewScheduledShift;
