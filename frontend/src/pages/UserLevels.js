import React, { useState, useEffect } from "react";
import axios from "axios";

const UserLevels = () => {
  const [userLevels, setUserLevels] = useState([]);
  const [newLevel, setNewLevel] = useState("");

  useEffect(() => {
    fetchUserLevels();
  }, []);

  const fetchUserLevels = async () => {
    try {
      const response = await axios.get("http://localhost:8082/api/userlevels");
      setUserLevels(response.data);
    } catch (error) {
      console.error("Error fetching user levels:", error);
    }
  };

  const handleAdd = async () => {
    if (!newLevel.trim()) {
      alert("Please enter a user level!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8082/api/userlevels", {
        userLevel: newLevel, // Ensure correct field name
      });

      alert("User Level Added Successfully!");
      setUserLevels([...userLevels, response.data]); // Append new level instead of re-fetching
      setNewLevel(""); // Clear input field
    } catch (error) {
      console.error("Error adding user level:", error);
      alert("Failed to add user level.");
    }
  };

  const handleDelete = async () => {
    if (!newLevel.trim()) {
      alert("Please enter a user level to delete!");
      return;
    }
    try {
      // Sending `levelName` as a path parameter in the URL
      await axios.delete(`http://localhost:8082/api/userlevels/${newLevel}`);

      alert("User Level Deleted Successfully!");
      setUserLevels(userLevels.filter(level => level.userLevel !== newLevel)); // Remove deleted level
      setNewLevel(""); 
    } catch (error) {
      console.error("Error deleting user level:", error);
      alert("Failed to delete user level.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage User Levels</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>User Level</th>
          </tr>
        </thead>
        <tbody>
          {userLevels.map((level) => (
            <tr key={level.id}>
              <td style={styles.td}>{level.id}</td>
              <td style={styles.td}>{level.userLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter User Level"
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
          style={styles.input}
        />

        <div style={styles.buttonContainer}>
          <button style={styles.deleteButton} onClick={handleDelete}>Delete</button>
          <button style={styles.submitButton} onClick={handleAdd}>Submit</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  heading: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  table: { width: "60%", borderCollapse: "collapse", margin: "auto", marginBottom: "20px" },
  th: { padding: "10px", borderBottom: "2px solid #ddd", backgroundColor: "#0056b3", color: "white" },
  td: { padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" },
  inputContainer: { marginTop: "20px" },
  input: { padding: "10px", fontSize: "16px", width: "40%" },
  buttonContainer: { display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" },
  deleteButton: { backgroundColor: "red", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
  submitButton: { backgroundColor: "green", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer" },
};

export default UserLevels;
