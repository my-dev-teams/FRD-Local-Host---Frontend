import { useState } from "react";

const AddInternalUser = () => {
  const [name, setName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [emil, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // Add error state

  const handleClear = () => {
    setName("");
    setEmployeeNumber("");
    setUserLevel("");
    setEmail("");
    setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Outlook email validation
    if (!/^[A-Za-z0-9._%+-]+@(?:outlook\.com|outlook\.lk)$/i.test(emil)) {
      setEmailError("Only Outlook email is allowed");
      return;
    } else {
      setEmailError("");
    }

    if (!name || !employeeNumber || !userLevel || !emil) {
      alert("All fields are required!");
      return;
    }

    // Using FormData to match Postman request
    const formData = new FormData();
    formData.append("name", name);
    formData.append("employeeNumber", employeeNumber);
    formData.append("userLevel", userLevel);
    formData.append("email", emil);
    

    try {
      const response = await fetch("http://localhost:8082/api/internal-users", {
        method: "POST",
        body: formData, // No need to set content-type header, it will be set automatically
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const result = await response.text(); // Read as text because backend sends plain text response
      alert(result);
      handleClear();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add user");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentContainer}>
        <div style={styles.formContainer}>
          <h2 style={styles.heading}>Add Internal User</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Employee Number:</label>
              <input
                type="text"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
                placeholder="Ex: EMP123"
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>User Level:</label>
              <select
                value={userLevel}
                onChange={(e) => setUserLevel(e.target.value)}
                style={styles.select}
                required
              >
                <option value="">Select Level</option>
                <option value="Petrol Leader">Petrol Leader</option>
                <option value="Security Manager ">Security Manager </option>
                <option value="Approver Level 1">Approver Level 1</option>
                <option value="Approver Level 2">Approver Level 2</option>
                <option value="Approver Level 3">Approver Level 3</option>
              </select>
            </div> 

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={emil}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: abc@outlook.com"
                style={styles.input}
                required
              />
              {emailError && (
                <span style={{ color: "red", fontSize: "13px" }}>{emailError}</span>
              )}
            </div>           

            <div style={styles.buttonGroup}>
              <button type="button" onClick={handleClear} style={styles.clearButton}>
                Clear
              </button>
              <button type="submit" style={styles.submitButton}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "none",
  },
  contentContainer: {
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.45)", 
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  inputGroup: { marginBottom: "15px" },
  label: { display: "block", fontWeight: "bold", marginBottom: "5px" },
  input: { width: "90%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  select: { width: "90%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  buttonGroup: { display: "flex", justifyContent: "space-between" },
  clearButton: { backgroundColor: "#f44336", color: "#fff", padding: "10px", borderRadius: "5px", cursor: "pointer" },
  submitButton: { backgroundColor: "#4CAF50", color: "#fff", padding: "10px", borderRadius: "5px", cursor: "pointer" },
};

export default AddInternalUser;
