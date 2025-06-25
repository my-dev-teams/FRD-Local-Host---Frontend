// src/pages/AdminDashboard.js

import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";

// Full layout wrapper
const DashboardWrapper = styled.div`
  display: flex;
`;

// Content section (center aligned)
const MainContent = styled.div`
  margin-left: 210px; /* Sidebar width */
  padding-top: 60px;  /* Navbar height */
  width: 100%;
  height: calc(100vh - 60px); /* Viewport height minus navbar */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  text-align: center;
`;

// Styled heading
const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff; /* or change to match your design */
`;

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <DashboardWrapper>
       
        <MainContent>
          <Heading>Welcome to the Admin Dashboard</Heading>
        </MainContent>
      </DashboardWrapper>
    </>
  );
};

export default AdminDashboard;
