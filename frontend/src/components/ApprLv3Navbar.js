import { useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(6, 44, 82);
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.img`
  height: 40px;
  width: 80px;
  object-fit: contain;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  flex: 1;
`;

const AdminSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const ApprLv3Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:8082/api/auth/user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.text())
      .then((data) => {
        if (data !== "No user logged in") {
          setUsername(data);
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, []);

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <NavbarContainer>
      <Logo src="/logo.png" alt="Company Logo" />
      <Title>Approver Level 3 Dashboard</Title>
      <AdminSection>
        {username && <h4>Logged in as: {username}</h4>}
        <LogoutButton onClick={handleLogout}>
          <FaPowerOff />
        </LogoutButton>
      </AdminSection>
    </NavbarContainer>
  );
};

export default ApprLv3Navbar;
