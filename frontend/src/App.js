import { useMsal } from "@azure/msal-react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import ApprLv1Navbar from "./components/ApprLv1Navbar";
import ApprLv1SideBar from "./components/ApprLv1Sidebar";
import ApprLv2Navbar from "./components/ApprLv2Navbar";
import ApprLv2SideBar from "./components/ApprLv2Sidebar";
import ApprLv3Navbar from "./components/ApprLv3Navbar";
import ApprLv3SideBar from "./components/ApprLv3SideBar";
import Navbar from "./components/Navbar";
import SecurityNavbar from "./components/SecurityNavbar";
import SecuritySidebar from "./components/SecuritySidebar";
import Sidebar from "./components/Sidebar";
import SMNavbar from './components/SMNavbar';
import SMSidebar from "./components/SMSidebar";
import AddCompany from "./pages/AddCompany";
import AddInternalUserForm from "./pages/AddInternal";
import AddSecurityOfficerForm from "./pages/AddSecurityOfficerForm";
import AdminDashboard from "./pages/AdminDashboard";
import AttendanceMarker from "./pages/AttendanceMarker";
import NewCompanyUser from "./pages/NewCompanyUser";
import SignIn from "./pages/SignIn";
import UserLevels from "./pages/UserLevels";
import ViewScheduledShift from "./pages/ViewScheduledShift";
import ViewSecurityOfficerForm from "./pages/ViewSecurityOfficerForm";

import { loginRequest } from "./authConfig";
import CompanySidebar from "./components/CompanySidebar";
import CompanyUserNavbar from "./components/CompanyUserNavbar";
import ApprLv1Dashboard from "./pages/ApprLv1Dashboard";
import ApprLv2Dashboard from "./pages/ApprLv2Dashboard";
import ApprLv3Dashboard from "./pages/ApprLv3Dashboard";
import CompanyUserDashboard from "./pages/CompanyUserDashboard";
import Lv1Approved from "./pages/Lv1Approved";
import Lv2Approved from "./pages/Lv2Approved";
import Lv3Approved from "./pages/Lv3Approved";
import PendingApprovals from "./pages/PendingApprovals";
import PendingLv2Approvals from "./pages/PendingLv2Approvals";
import PendingLv3Approvals from "./pages/PendingLv3Approvals";
import SecurityManager from "./pages/SecurityManager";
import TimeCardStatus1 from "./pages/TimeCardStatusL1";
import TimeCardStatus2 from "./pages/TimeCardStatusL2";
import TimeCardStatus3 from "./pages/TimeCardStatusL3";
import TimeShiftProgress from "./pages/TimeShiftProgress";
import ViewWorkForm from "./pages/ViewWorkForm";




// Importing the new pages



import AdminView from "./pages/AdminView";
import ApprL1 from './pages/ApprL1';
import ApprL2 from './pages/ApprL2';
import ApprL3 from './pages/ApprL3';
import ApprLv1Shift from './pages/ApprLv1Shift';
import ApprLv2Shift from './pages/ApprLv2Shift';
import ApprovalHistory from "./pages/ApprovalHistory";
import ApprovalHistoryL1 from "./pages/ApprovalHistoryL1";
import ApprovalHistoryL2 from "./pages/ApprovalHistoryL2";
import ApprovalHistoryL3 from "./pages/ApprovalHistoryL3";
import ApprovalHistoryPLD from "./pages/ApprovalHistoryPLD";
import ApprovalHistorySM from "./pages/ApprovalHistorySM";
import PetrolLeaderDashboardView from "./pages/PetrolLeaderDashboardView";
import PetrolLeaderDashboardView2 from "./pages/PetrolLeaderDashboardView2";
import PetrolLeaderShift from "./pages/PetrolLeaderShift";
import SecurityManagerDashboard from "./pages/SecurityManagerDashboard";
import SecurityShift from "./pages/SecurityShift";






const Container = styled.div`
  display: flex;
  margin-top: 60px; /* Navbar height */
`;

const SidebarWrapper = styled.div`
  width: 240px;
`;

const MainContent = styled.div`
  flex: 1;
  height: 100vh;
  padding: 20px;
  background-image: url("/background.png");
  background-size: cover;
  background-position: center;
  overflow-y: auto;
`;

const Layout = ({ children }) => {
  const location = useLocation();

  const securityPages = ["/petrolleaderdashboard", "/ViewScheduledShift", "/attendancemarker", "/ApprovalHistoryPLD", "/PetrolLeaderDashboardView", "/PetrolLeaderShift", "/ApprovalHistory"];
  const apprLv1Pages = ["/ApprLv1dashboard", "/PendingApprovals", "/Lv1Approved", "TimeCardStatusL1", "/ApprL1", "/ApprovalHistoryL1"];
   const apprLv2Pages = ["/ApprLv2Dashboard", "/PendingLv2Approvals", "/Lv2Approved", "TimeCardStatusL2", "/ApprL2", "/ApprovalHistoryL2"];
    const apprLv3Pages = ["/ApprLv3Dashboard", "/PendingLv3Approvals", "/Lv3Approved", "TimeCardStatusL3", "/ApprovalHistoryL3"];
  //const apprLv2Pages = ["/approverlv2dashboard"];
  const securityManagerPages = ["/SecurityManagerDashboard", "/SecurityManager","/SMNavbar", "/SMSidebar", "/ApprovalHistorySM"];
  const companyPages = ["/CompanyUserDashboard", "/ViewWorkForm", "/CompanyUserNavbar", "/CompanySidebar"];

  const isSecurityPage = securityPages.includes(location.pathname);
  const isSecurityManagerPage = securityManagerPages.includes(location.pathname);
  const isApprLv1Page = apprLv1Pages.includes(location.pathname);
  const isApprLv2Page = apprLv2Pages.includes(location.pathname);
  const isApprLv3Page = apprLv3Pages.includes(location.pathname);
  const isCompanyPage = companyPages.includes(location.pathname);
  const isSignInPage = location.pathname === "/signin" || location.pathname === "/";

  return (
    <div className={isSecurityPage ? "security-container" : ""}>
      {/* Hide Navbar on / and /signin */}
      {!isSignInPage && !isSecurityPage && !isApprLv1Page && <Navbar />}
      {isApprLv1Page && <ApprLv1Navbar />}
      {isApprLv2Page && <ApprLv2Navbar />}
      {isApprLv3Page && <ApprLv3Navbar />}
      {isSecurityPage && <SecurityNavbar />}
      {isSecurityManagerPage && <SecurityNavbar />}
      {isSecurityManagerPage && <SMNavbar />}

      <Container>
        {!isSignInPage && !isSecurityPage && !isApprLv1Page  && !isApprLv2Page && !isApprLv3Page && !isCompanyPage && !isSecurityManagerPage &&(
          <SidebarWrapper>
            <Sidebar />
          </SidebarWrapper>
        )}
        {isApprLv1Page && (
          <SidebarWrapper>
            <ApprLv1SideBar />
          </SidebarWrapper>
        )}
        {isApprLv2Page && (
          <SidebarWrapper>
            <ApprLv2SideBar />
          </SidebarWrapper>
        )}
        {isApprLv3Page && (
          <SidebarWrapper>
            <ApprLv3SideBar />
          </SidebarWrapper>
        )}
        {isCompanyPage && (
          <SidebarWrapper>
            <CompanySidebar />
            <CompanyUserNavbar />
          </SidebarWrapper>
        )}
        {isSecurityManagerPage && (
          <SidebarWrapper>
            <SMSidebar />
          </SidebarWrapper>
        )}
        <MainContent>
          {isSecurityPage && <SecuritySidebar />}
          {children}
        </MainContent>
      </Container>
    </div>
  );
};

function App() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SignIn />} /> {/* Show SignIn on root */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} /> {/* Replace with your actual AdminDashboard component if needed */}
          <Route path="/addcompany" element={<AddCompany />} />
          <Route path="/newcompanyuser" element={<NewCompanyUser />} />
          <Route path="/userlevels" element={<UserLevels />} />
          <Route path="/add-internal" element={<AddInternalUserForm />} />
          <Route path="/addsecurityofficer" element={<AddSecurityOfficerForm />} />
          <Route path="/viewsecurityofficer" element={<ViewSecurityOfficerForm />} />
          <Route path="/petrolleaderdashboard" element={<h1>Petrol Leader Dashboard</h1>} />
          <Route path="/attendancemarker" element={<AttendanceMarker />} />
          <Route path="/ViewScheduledShift" element={<ViewScheduledShift />} />
          <Route path="/PendingApprovals" element={<PendingApprovals />} />
          <Route path="/ApprLv1Dashboard" element={<ApprLv1Dashboard/>} />
          <Route path="/Lv1Approved" element={<Lv1Approved/>} />
          <Route path="/TimeShiftProgress" element={<TimeShiftProgress />} />
          
          
          <Route path="/CompanyUserDashboard" element={<CompanyUserDashboard />} />
          <Route path="/TimeCardStatus1" element={<TimeCardStatus1 />} />
          <Route path="/TimeCardStatus2" element={<TimeCardStatus2 />} />
          <Route path="/TimeCardStatus3" element={<TimeCardStatus3 />} />
          <Route path="/PendingLv2Approvals" element={<PendingLv2Approvals />} />
          <Route path="/Lv2Approved" element={<Lv2Approved />} />
          <Route path="/PendingLv3Approvals" element={<PendingLv3Approvals />} />
          <Route path="/Lv3Approved" element={<Lv3Approved />} />
          <Route path="/TimeShiftProgress" element={<TimeShiftProgress />} />
          <Route path="/SecurityManager" element={<SecurityManager />} />
          <Route path="ApprLv1Sidebar" element={<ApprLv1SideBar />} />
          <Route path="/ApprLv2Dashboard" element={
            <>
              <ApprLv2Navbar />
              <div style={{ display: "flex" }}>
                <ApprLv2SideBar />
                <ApprLv2Dashboard />
              </div>
            </>
          } />
          <Route path="/ApprLv3Dashboard" element={<ApprLv3Dashboard />} />
          <Route path="/ViewWorkForm" element={<ViewWorkForm />} />
          <Route path="/ApprLv2Dashboard" element={<ApprLv2SideBar />} />
          <Route path="/ApprLv3Sidebar" element={<ApprLv3SideBar />} />
          <Route path="/ApprL2Navbar" element={<ApprLv2Navbar />} />
          <Route path="/ApprL3Navbar" element={<ApprLv3Navbar />} />


          <Route path="/ApprL1" element={<ApprL1 />} />
          <Route path="/ApprL2" element={<ApprL2 />} />
          <Route path="/ApprL3" element={<ApprL3 />} />

          
          {/* Add more routes as needed */}

          
          <Route path="/AdminView" element={<AdminView />} />
          <Route path="/SecurityManagerDashboard" element={<SecurityManagerDashboard />} />
          <Route path="/PetrolLeaderDashboardView" element={<PetrolLeaderDashboardView />} />
          <Route path="/SecurityShift" element={<SecurityShift />} />
          <Route path="/PetrolLeaderShift" element={<PetrolLeaderShift />} />
          <Route path="/ApprLv1Shift" element={<ApprLv1Shift />} />
          <Route path="/ApprLv2Shift" element={<ApprLv2Shift />} />
          <Route path="/PetrolLeaderDashboardView2" element={<PetrolLeaderDashboardView2 />} />
          <Route path="/ApprovalHistoryL1" element={<ApprovalHistoryL1 />} />
          <Route path="/ApprovalHistoryL2" element={<ApprovalHistoryL2 />} />
          <Route path="/ApprovalHistoryL3" element={<ApprovalHistoryL3 />} />
          <Route path="/ApprovalHistorySM" element={<ApprovalHistorySM />} />
          <Route path="/ApprovalHistoryPLD" element={<ApprovalHistoryPLD />} />
          <Route path="/ApprovalHistory" element={<ApprovalHistory />} />
          
      
          
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;