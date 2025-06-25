import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPowerOff } from "react-icons/fa";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color:rgb(4, 33, 62);
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.img`
  height: 40px;
  margin-left: 20px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

const AdminSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  const [username, setUsername] = useState("");
  
    useEffect(() => {
      fetch("http://localhost:8082/api/auth/user", {
        method: "GET",
        credentials: "include", // Required for session-based authentication
      })
        .then((response) => response.text())
        .then((data) => {
          if (data !== "No user logged in") {
            setUsername(data);
          }
        })
        .catch((error) => console.error("Error fetching user:", error));
    }, []);

  return (
    <NavbarContainer>
      <Logo src="/logo.png" alt="SLT Logo" />
      <Title>Manage Security Attendance | Admin Dashboard</Title>
      <AdminSection>
      {username && <h4>Logged in as: {username}</h4>}
        <LogoutButton onClick={handleLogout}>
          <FaPowerOff />
        </LogoutButton>
      </AdminSection>
    </NavbarContainer>
  );
};

export default Navbar;
