import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 60px; /* Adjust based on navbar height */
  width: 250px;
  height: calc(100vh - 60px);
  background-color: rgb(6, 44, 82);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;


const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SidebarButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  background-color: rgb(6, 44, 82);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 6px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgb(9, 9, 9);
  }
`;

const ApprLv1SideBar = () => {
  const navigate = useNavigate(); 

  return (
    <SidebarContainer>
      
      <SidebarList>
      <SidebarButton onClick={() => navigate("/ApprLv1dashboard")}>
          Home
        </SidebarButton>
        <SidebarButton onClick={() => navigate("/PendingApprovals")}>
          Pending Approvals
        </SidebarButton>
        <SidebarButton onClick={() => navigate("/Lv1Approved")}>
          Approved List 
        </SidebarButton>
        <SidebarButton onClick={() => navigate("/ApprL1")}>
          Rejected List
        </SidebarButton>
        <SidebarButton onClick={() => navigate("/ApprovalHistoryL1")}>
          Approval History
        </SidebarButton>
        
        
      </SidebarList>
    </SidebarContainer>
  );
};

export default ApprLv1SideBar;
