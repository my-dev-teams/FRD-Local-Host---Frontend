import React from "react";

function ApproverLv3Dashboard() {
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('/background.png')",
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
    },
    paragraph: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Approver Level 3 Dashboard</h1>
      <p style={styles.paragraph}></p>
    </div>
  );
}

export default ApproverLv3Dashboard;
