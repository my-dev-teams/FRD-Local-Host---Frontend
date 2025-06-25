import axios from "axios";
import { useState } from "react";

const AddCompany = () => {
  const [company, setCompany] = useState({
    comName: "",
    comContactNo: "",
    comAddress: "",
    comEmail: "",
  });

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setCompany({ comName: "", comContactNo: "", comAddress: "", comEmail: "" });
  };

  const addCompany = async () => {
    if (!company.comName || !company.comContactNo || !company.comAddress || !company.comEmail) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8082/api/companies", company);
      alert(response+"Company added Successfully!!!"); 
      clearForm();
    } catch (error) {
      console.error("Error adding company:", error);
      alert("Failed to add company. Check console for details.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Add New Company</h2>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Company Name:</label>
          <input
            type="text"
            name="comName"
            placeholder="Enter company name"
            style={styles.input}
            value={company.comName}
            onChange={handleChange}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Contact Number:</label>
          <input
            type="text"
            name="comContactNo"
            placeholder="Enter contact number"
            style={styles.input}
            value={company.comContactNo}
            onChange={handleChange}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Company Address:</label>
          <input
            type="text"
            name="comAddress"
            placeholder="Enter company address"
            style={styles.input}
            value={company.comAddress}
            onChange={handleChange}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Company Email:</label>
          <input
            type="email"
            name="comEmail"
            placeholder="Enter company email"
            style={styles.input}
            value={company.comEmail}
            onChange={handleChange}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.clearButton} onClick={clearForm}>Clear</button>
          <button style={styles.submitButton} onClick={addCompany}>Submit</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" },
  formContainer: {
  backgroundColor: "rgba(255, 255, 255, 0.47)", // semi-transparent white
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.45)",
  width: "400px"
},
  heading: { textAlign: "center", fontSize: "24px", fontWeight: "bold", marginBottom: "15px" },
  inputGroup: { marginBottom: "10px" },
  label: { fontWeight: "bold", display: "block", marginBottom: "5px" },
  input: { width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "5px" },
  buttonGroup: { display: "flex", justifyContent: "space-between", marginTop: "15px" },
  clearButton: { backgroundColor: "#d9534f", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" },
  submitButton: { backgroundColor: "#28a745", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default AddCompany;
