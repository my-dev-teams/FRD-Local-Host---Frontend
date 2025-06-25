import React from "react";

function ApproverLv2Dashboard() {
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      textAlign: "center",
      color: "#fff",
      padding: "20px",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center", // Ensure headline is centered
      width: "100%",       // Take full width for centering
    },
    paragraph: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      textAlign: "center", // Ensure headline is centered
      width: "100%",       
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Approver Level 2 Dashboard</h1>
      <p style={styles.paragraph}></p>
    </div>
  );
}

export default ApproverLv2Dashboard;