import axios from "axios";
import { useEffect, useState } from "react";

const NewCompanyUser = () => {
  const [user, setUser] = useState({
    comuserName: "",
    comUserContact: "",
    companyName: "", // Updated to store com_name instead of comID
    comUserDesignation: "",
    comUserEmail: "",
    tempPassword: "",
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setUser({
      comuserName: "",
      comUserContact: "",
      companyName: "",
      comUserDesignation: "",
      comUserEmail: "",
      tempPassword: "",
    });
  };

  const addCompanyUser = async () => {
    if (Object.values(user).some((value) => !value)) {
      alert("All fields are required!");
      return;
    }
    try {
      await axios.post("http://localhost:8082/api/companyuser/company-users", user);
      alert("Company user added successfully!");
      clearForm();
    } catch (error) {
      console.error("Error adding company user", error);
      alert("Failed to add company user");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.45)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "20px" }}>New Company User</h2>

        {[
          { label: "Name", name: "comuserName", type: "text" },
          { label: "Contact Number", name: "comUserContact", type: "text" },
          { label: "Designation", name: "comUserDesignation", type: "text" },
          { label: "Email", name: "comUserEmail", type: "email" },
          { label: "Temporary Password", name: "tempPassword", type: "password" },
        ].map(({ label, name, type }) => (
          <div style={{ textAlign: "left", marginBottom: "10px" }} key={name}>
            <label style={{ fontWeight: "bold" }}>{label}:</label>
            <input
              type={type}
              name={name}
              placeholder={`Enter ${label}`}
              value={user[name]}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}

        <div style={{ textAlign: "left", marginBottom: "10px" }}>
          <label style={{ fontWeight: "bold" }}>Company:</label>
          <select
            name="companyName"
            value={user.companyName}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.comName}>
                {company.comName}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={clearForm}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              width: "45%",
            }}
          >
            Clear
          </button>
          <button
            onClick={addCompanyUser}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              width: "45%",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewCompanyUser;
