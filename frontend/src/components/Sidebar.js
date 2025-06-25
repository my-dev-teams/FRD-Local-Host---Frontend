import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.aside`
  position: fixed;
  width: 210px;
  height: 100vh;
  background-color: rgb(6, 44, 82);
  padding: 32px;
  
`;

const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarButton = styled.button`
  width: 220px;
  padding: 12px;
  margin-bottom: 10px;
  border: none;
  background-color: ${({ active }) => (active ? "#062C52" : "#062C52")};
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  text-align: left;
  position: relative;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(0, 0, 0);
  }
`;

const DropdownContainer = styled.div`
  margin-left: 20px;
`;

const DropdownButton = styled(SidebarButton)`
  background-color: ${({ variant }) => (variant === "company" ? " #062C52" : " #062C52")};
`;

const DropdownMark = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

const Sidebar = () => {
  const [isExternalOpen, setIsExternalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      
      <SidebarList>
      <SidebarButton onClick={() => navigate("/adminview")}>
          Home
        </SidebarButton>
        <SidebarButton onClick={() => navigate("/add-internal")}>
          Add Internal User
        </SidebarButton>
        <SidebarButton onClick={() => setIsExternalOpen(!isExternalOpen)}>
          Add External User
          <DropdownMark>{isExternalOpen ? "▲" : "▼"}</DropdownMark>
        </SidebarButton>
        {isExternalOpen && (
          <DropdownContainer>
            <DropdownButton variant="company" onClick={() => navigate("/addcompany")}>
              🏢 New Company
            </DropdownButton>
            <DropdownButton variant="user" onClick={() => navigate("/newcompanyuser")}>
              👤 Company User
            </DropdownButton>
          </DropdownContainer>
        )}
        <SidebarButton onClick={() => navigate("/userlevels")}>
          Manage User Levels
        </SidebarButton>
        <SidebarButton onClick={() => navigate("/addsecurityofficer")}>
          Manage Security Employee
        </SidebarButton>
        <SidebarButton onClick={() => navigate("/viewsecurityofficer")}>
          View Security Employee
        </SidebarButton>
        <SidebarButton onClick={() => navigate("/ApprovalHistory")}>
          Approval History
        </SidebarButton>
      </SidebarList>
       
    </SidebarContainer>
  );
};

export default Sidebar;
