import React, { useEffect } from "react";
import styled from "styled-components";
import CompanyUserNavbar from "../components/CompanyUserNavbar";
import CompanySidebar from "../components/CompanySidebar";

const Container = styled.div`
  display: flex;
  margin-top: 60px;
  height: 100vh; /* Ensure it takes the full height */
`;

const SidebarWrapper = styled.div`
  width: 240px;
`;

const DashboardWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background-image: url("/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  text-align: center;
  color: #fff;
  overflow: hidden;  /* Remove the scrollbar */
`;

const DashboardHeader = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const WelcomeMessage = styled.p`
  font-size: 1.2rem;
  margin-top: 20px;
`;

const CompanyUserDashboard = () => {
  useEffect(() => {
    // Disable the page scrollbar by applying overflow hidden to the body
    document.body.style.overflow = "hidden";

    // Cleanup: Re-enable scrollbar on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <CompanyUserNavbar />
      <Container>
        {/* Sidebar */}
        <SidebarWrapper>
          <CompanySidebar />
        </SidebarWrapper>

        {/* Dashboard Content */}
        
      </Container>
    </div>
  );
};

export default CompanyUserDashboard;
