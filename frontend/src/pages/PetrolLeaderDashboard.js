import React from "react";

function PetrolLeaderDashboard() {
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
      <h1 style={styles.heading}>Petrol Leader Dashboard</h1>
      <p style={styles.paragraph}>Welcome to the Petrol Leader Dashboard!</p>
    </div>
  );
}

export default PetrolLeaderDashboard;
