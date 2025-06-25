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
`;

const FormWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  width: 90%;
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

const Button = styled.button`
  padding: 10px 15px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#007bff" : "#28a745")};
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

const SecurityManager = () => {
  const [arrivalDate, setArrivalDate] = useState("");
  const [supervisorNumber, setSupervisorNumber] = useState("");
  const [entries, setEntries] = useState([]);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const shiftDurations = {
    "6 hours": 6,
    "12 hours": 12,
    "24 hours": 24,
    "48 hours": 48,
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
  }, []);

  useEffect(() => {
    if (username) {
      fetch(`http://localhost:8082/api/security-officer?username=${username}`)
        .then((response) => response.json())
        .then((data) => {
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
            present: "Present",
            urgentReason: "", // Add urgent reason field
          }));
          setEntries(defaultEntries);
        })
        .catch((error) => console.error("Error fetching names:", error));
    }
  }, [username]);

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

    setEntries(updatedEntries);
  };

  const handleSubmit = () => {
    if (!arrivalDate || !supervisorNumber) {
      alert("Arrival Date and Supervisor Number are required!");
      return;
    }

    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      if (!e.designation || !e.location || !e.name || !e.arrivalTime || !e.departureDate || !e.departureTime) {
        alert(`Please fill in all fields for entry ${i + 1}`);
        return;
      }

      // If the status is "Absent", ensure the urgent reason is provided
      if (e.present === "Absent" && !e.urgentReason) {
        alert(`Please provide an urgent reason for ${e.name} as they are marked as Absent`);
        return;
      }
    }

    const requestData = entries.map((entry) => ({
      arrivalDate,
      supervisorNumber,
      ...entry,
    }));

    fetch("http://localhost:8082/api/attendance/saveAll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(data => {
            alert(`Submission rejected: ${data.reason || "Unknown error"}`);
            throw new Error("Submission failed");
          });
        }
        return response.json();
      })
      .then(() => {
        alert("✅ Attendance submitted successfully!");
        setEntries([]);
        navigate("/attendance-marker");
      })
      .catch((error) => {
        console.error("Error saving attendance:", error);
      });
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Security Manager</h2>

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
                <Th>Shift Type</Th>
                <Th>Designation</Th>
                <Th>Location</Th>
                <Th>Arrival Time</Th>
                <Th>Departure Date</Th>
                <Th>Departure Time</Th>
                <Th>Present</Th>
                <Th>Urgent Reason</Th> 
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <Td><input type="text" value={entry.name} readOnly /></Td>
                  <Td><input type="text" value={entry.nic} readOnly /></Td>
                  <Td><input type="text" value={entry.empId} readOnly /></Td>
                  <Td>
                    <select value={entry.shiftType} onChange={(e) => handleChange(index, "shiftType", e.target.value)}>
                      {Object.keys(shiftDurations).map((shift, i) => (
                        <option key={i} value={shift}>{shift}</option>
                      ))}
                    </select>
                  </Td>
                  <Td><input type="text" value={entry.designation} onChange={(e) => handleChange(index, "designation", e.target.value)} /></Td>
                  <Td><input type="text" value={entry.location} onChange={(e) => handleChange(index, "location", e.target.value)} /></Td>
                  <Td><input type="time" value={entry.arrivalTime} onChange={(e) => handleChange(index, "arrivalTime", e.target.value)} /></Td>
                  <Td><input type="date" value={entry.departureDate} readOnly /></Td>
                  <Td><input type="time" value={entry.departureTime} readOnly /></Td>
                  <Td>
                    <select value={entry.present} onChange={(e) => handleChange(index, "present", e.target.value)}>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </Td>
                  
                  <Td><input type="text" value={entry.designation} onChange={(e) => handleChange(index, "urgentReason", e.target.value)} /></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>

        <Button primary onClick={handleSubmit}>Submit</Button>
      </FormWrapper>
    </Container>
  );
};

export default SecurityManager;
