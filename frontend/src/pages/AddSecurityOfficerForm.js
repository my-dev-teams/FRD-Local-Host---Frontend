import axios from 'axios';
import { useEffect, useState } from 'react';

const AddSecurityOfficerForm = () => {
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [empId, setEmpId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [supervisors, setSupervisors] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Fetch supervisors
  useEffect(() => {
    axios.get('http://localhost:8082/api/security-officer/supervisors')
      .then(response => setSupervisors(response.data))
      .catch(error => console.error('Error fetching supervisors:', error));
  }, []);

  // Fetch companies
  useEffect(() => {
    axios.get('http://localhost:8082/api/security-officer/companies')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const handleClear = () => {
    setName('');
    setNic('');
    setEmpId('');
    setContactNumber('');
    setAddress('');
    setSupervisor('');
    setCompanyName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !nic || !empId || !contactNumber || !address || !supervisor || !companyName) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/api/security-officer/add', {
        name,
        nic,
        empId,
        contactNumber,
        address,
        supervisorName: supervisor,
        companyName
      });

      alert(response.data);
      handleClear();
    } catch (error) {
      console.error('Error adding security officer:', error);
      alert('Failed to add security officer.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Add Security Officer</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>NIC Number:</label>
            <input
              type="text"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              style={styles.input}
              required
              pattern="^([0-9]{9}[vVxX]|[0-9]{12})$"
              title="Enter valid NIC number (old: 9 digits + V/X, new: 12 digits)"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Emp ID:</label>
            <input type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact Number:</label>
            <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Supervisor:</label>
            <select value={supervisor} onChange={(e) => setSupervisor(e.target.value)} style={styles.select} required>
              <option value="">Select Supervisor</option>
              {supervisors.map((sup) => (
                <option key={sup.id} value={sup.name}>{sup.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Company Name:</label>
            <select value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={styles.select} required>
              <option value="">Select Company</option>
              {companies.map((company) => (
                <option key={company.comID} value={company.comName}>{company.comName}</option>
              ))}
            </select>
          </div>

          <div style={styles.buttonGroup}>
            <button type="button" onClick={handleClear} style={styles.clearButton}>Clear</button>
            <button type="submit" style={styles.submitButton}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120vh',
    backgroundImage: "url('background.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  formContainer: {
    width: '400px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  logo: {
    width: '100px',
    marginBottom: '15px',
  },
  heading: {
    fontSize: '22px',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  clearButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};


export default AddSecurityOfficerForm;
