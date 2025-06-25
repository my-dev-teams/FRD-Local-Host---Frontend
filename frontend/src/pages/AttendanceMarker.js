import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  width: 100%;
  padding-left: 140px;  
`;

const FormWrapper = styled.div`
  padding: 10px;
  border-radius: 10px;
  width: 83%;
  text-align: center;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input, select {
    width: 200px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const Button = styled.button.attrs({ type: "button" })`
  padding: 10px 15px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.$primary ? "#007bff" : "#28a745")};
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const TableWrapper = styled.div`
  background: transparent;
  padding: 10px;
  border-radius: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: rgba(244, 244, 244, 0.7);
  font-weight: bold;
  padding: 10px;
  border: 1px solid #ccc;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;

  input, select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.5);
  }
`;

const AttendanceMarker = () => {
  const [arrivalDate, setArrivalDate] = useState("");
  const [supervisorNumber, setSupervisorNumber] = useState("");
  const [entries, setEntries] = useState([]);
  const [username, setUsername] = useState("");
  const [restingEmployees, setRestingEmployees] = useState(() => {
    const data = localStorage.getItem("restingEmployees");
    return data ? JSON.parse(data) : {};
  });

  const navigate = useNavigate();

  const shiftDurations = {
    "6 hours": 6,
    "12 hours": 12,
    "24 hours": 24,
    "36 hours": 36,
  };

  useEffect(() => {
    fetch("http://localhost:8082/api/auth/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.text())
      .then((data) => {
        if (data !== "No user logged in") {
          setUsername(data);
          setSupervisorNumber(data);
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [restingEmployees]);

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:8082/api/security-officer/get-officer?username=${username}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched officers data:", data);
          if (!Array.isArray(data)) {
            throw new Error("Expected an array but got: " + JSON.stringify(data));
          }

          const defaultEntries = data.map((emp) => ({
            name: emp.name,
            nic: emp.nic,
            empId: emp.empId,
            shiftType: "6 hours",
            designation: "",
            location: "",
            arrivalTime: "",
            departureDate: "",
            departureTime: "",
            remarks: "",
            attendance: "Present",
            urgent: false,
            urgentReason: "",
          }));
          setEntries(defaultEntries);
        })
        .catch((error) => console.error("Error fetching names:", error));
    }
  }, [username]);

  useEffect(() => {
    const now = Date.now();
    const updated = {};
    Object.entries(restingEmployees).forEach(([empKey, until]) => {
      if (now < until) updated[empKey] = until;
    });
    if (Object.keys(updated).length !== Object.keys(restingEmployees).length) {
      setRestingEmployees(updated);
      localStorage.setItem("restingEmployees", JSON.stringify(updated));
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;

    if ((field === "arrivalTime" || field === "shiftType") && arrivalDate && updatedEntries[index].arrivalTime) {
      const shiftHours = shiftDurations[updatedEntries[index].shiftType];
      const start = new Date(`${arrivalDate}T${updatedEntries[index].arrivalTime}`);
      const end = new Date(start.getTime() + shiftHours * 60 * 60 * 1000);
      updatedEntries[index].departureDate = end.toISOString().split("T")[0];
      updatedEntries[index].departureTime = end.toTimeString().slice(0, 5);
    }

    if (field === "urgent" && !value) {
      updatedEntries[index].urgentReason = "";
    }

    setEntries(updatedEntries);
  };

  function isEmployeeResting(entry) {
    const empKey = entry.nic || entry.empId;
    if (!empKey) return false;
    const until = restingEmployees[empKey];
    return until && Date.now() < until;
  }

  function isShiftEnded(entry) {
    if (!entry.arrivalTime || !entry.shiftType || !arrivalDate) return false;
    
    const shiftDurationHours = shiftDurations[entry.shiftType];
    if (!shiftDurationHours) return false;
    
    // Create shift start datetime
    const shiftStart = new Date(`${arrivalDate}T${entry.arrivalTime}`);
    
    // Calculate shift end time
    const shiftEnd = new Date(shiftStart.getTime() + (shiftDurationHours * 60 * 60 * 1000));
    
    // Check if current time is past shift end time
    const now = new Date();
    return now > shiftEnd;
  }

  function qualifiesForRest(entry, entries) {
    const empKey = entry.nic || entry.empId;
    if (!empKey) return false;
    const empShifts = entries.filter(
      e => (e.nic || e.empId) === empKey && e.shiftType && shiftDurations[e.shiftType]
    );
    let totalHours = 0;
    empShifts.forEach(e => {
      totalHours += shiftDurations[e.shiftType];
    });
    return totalHours >= 24;
  }
  const handleSubmit = () => {
    if (!arrivalDate || !supervisorNumber) {
      alert("Arrival Date and Supervisor Number are required!");
      return;
    }

    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      
      // If attendance is "Absent", only check for name (which is always filled from API)
      if (e.present === "Absent") {
        if (!e.name) {
          alert(`Name is required for entry ${i + 1}`);
          return;
        }
      } else {
        // For "Present" attendance, all fields are required
        if (!e.designation || !e.location || !e.name || !e.arrivalTime || !e.departureDate || !e.departureTime) {
          alert(`Please fill in all fields for entry ${i + 1}`);
          return;
        }
      }
      
      if (e.urgent && !e.urgentReason) {
        alert(`Please enter a reason for urgent entry at row ${i + 1}`);
        return;
      }
    }

    const month = arrivalDate.slice(0, 7);

    const attendanceData = entries.map((entry) => ({
      arrivalDate,
      supervisorNumber,
      ...entry,
    }));

    const approvalData = entries.map((entry) => ({
      nicNumber: entry.nic,
      officerType: "Petrol Leader",
      officerId: supervisorNumber,
      action: entry.urgent ? "Urgent Process" : "Uploaded",
      timeStamp: new Date().toISOString(),
      remarks: entry.remarks || "",
    }));

    const workLogData = entries.map((entry) => ({
      nicNumber: entry.nic,
      month,
      shiftHours: shiftDurations[entry.shiftType],
    }));

    const newResting = { ...restingEmployees };
    const now = Date.now();
    entries.forEach(entry => {
      if (qualifiesForRest(entry, entries)) {
        const empKey = entry.nic || entry.empId;
        newResting[empKey] = now + 12 * 60 * 60 * 1000;
      }
    });
    setRestingEmployees(newResting);
    localStorage.setItem("restingEmployees", JSON.stringify(newResting));

    fetch("http://localhost:8082/api/attendance/saveAll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendanceData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(data => {
            alert(`Attendance submission failed: ${data.reason || "Unknown error"}`);
            throw new Error("Attendance submission failed");
          });
        }
        return res.json();
      })
      .then(() =>
        fetch("http://localhost:8082/api/approve-process/saveAll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(approvalData),
        })
      )
      .then((res) => {
        if (!res.ok) throw new Error("Approve Process submission failed");
        return fetch("http://localhost:8082/api/work-log/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(workLogData),
        });
      })
      .then((res) => {
        if (!res.ok) throw new Error("Work Log update failed");
        alert("✅ All records submitted successfully!");
        setEntries([]);
        navigate("/attendancemarker");
      })
      .catch((err) => {
        console.error("Error during submission:", err);
      });
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Attendance Marker</h2>

        <InputRow>
          <InputGroup>
            <label>Arrival Date:</label>
            <input type="date" value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
          </InputGroup>

          <InputGroup>
            <label>Supervisor Number:</label>
            <input type="text" value={supervisorNumber} readOnly />
          </InputGroup>
        </InputRow>

        <TableWrapper>
          <Table>
            <thead>
              <tr>                
                <Th>Name</Th>
                <Th>NIC</Th>
                <Th>Emp ID</Th>
                <Th>Designation</Th>
                <Th>Location</Th>
                <Th>Arrival Time</Th>
                <Th>Departure Date</Th>
                <Th>Departure Time</Th>
                <Th>Attendance</Th>
                <Th>Shift Type</Th>                
                <Th>Remarks</Th>
              </tr>
            </thead>            <tbody>
              {entries
                .filter(entry => !isEmployeeResting(entry) && !isShiftEnded(entry))
                .map((entry, index) => (
                  <tr key={index}>
                    <Td><input type="text" value={entry.name} readOnly /></Td>
                    <Td><input type="text" value={entry.nic} readOnly /></Td>
                    <Td><input type="text" value={entry.empId} readOnly /></Td>
                    <Td><input type="text" value={entry.designation} onChange={(e) => handleChange(index, "designation", e.target.value)} /></Td>
                    <Td><input type="text" value={entry.location} onChange={(e) => handleChange(index, "location", e.target.value)} /></Td>
                    <Td><input type="time" value={entry.arrivalTime} onChange={(e) => handleChange(index, "arrivalTime", e.target.value)} /></Td>
                    <Td><input type="date" value={entry.departureDate} readOnly /></Td>
                    <Td><input type="time" value={entry.departureTime} readOnly /></Td>
                    <Td>
                      <select value={entry.present} onChange={(e) => handleChange(index, "attendance", e.target.value)}>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </Td>
                    <Td>
                      <select value={entry.shiftType} onChange={(e) => handleChange(index, "shiftType", e.target.value)}>
                        {Object.keys(shiftDurations).map((shift, i) => (
                          <option key={i} value={shift}>{shift}</option>
                        ))}
                      </select>
                    </Td>
                    <Td><input type="text" value={entry.remarks} onChange={(e) => handleChange(index, "remarks", e.target.value)} /></Td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Button $primary onClick={handleSubmit}>Submit</Button>
      </FormWrapper>
    </Container>
  );
};

export default AttendanceMarker;
