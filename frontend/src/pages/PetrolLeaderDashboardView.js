import React from "react";
import styled from "styled-components";
import SMSidebar from "../components/SMSidebar";
import SMNavbar from "../components/SMNavbar";

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ContentArea = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  z-index: 1;
`;

const CenteredContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 60px 20px;
`;

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  border-radius: 16px;
  padding: 50px 40px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  /* Pure blurred background image only */
  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url("https://images.unsplash.com/photo-1531496660071-5ad1c2b6c4a4?auto=format&fit=crop&w=1470&q=80");
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: 0;
  }
`;

const ContentInner = styled.div`
  position: relative; /* content above the blurred background */
  z-index: 1;

  /* Removed white background to show blur only */
  /* background-color: rgba(255, 255, 255, 0.9); */
  border-radius: 16px;
  padding: 20px;
  color: #1e293b; /* Dark text for readability */
`;

const Header = styled.h2`
  font-size: 36px;
  color: #1e293b;
  text-align: center;
  margin-bottom: 50px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const Card = styled.div`
  background-color: #f8fafc;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.07);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 14px;
  color: #334155;
  margin-bottom: 12px;
`;

const CardNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: #1e40af;
`;

const PetrolLeaderDashboardView = () => {
  const totalOfficers = 8;
  const presentOfficers = 4;
  const absentOfficers = 3;
  const leaveRequests = 1;

  return (
    <PageWrapper>
      <ContentArea>
        <SMSidebar />
        <CenteredContainer>
          <ContentWrapper>
            <ContentInner>
              <Header>Petrol Leader Dashboard</Header>
              <CardsContainer>
                <Card>
                  <CardTitle>Total Security Officers</CardTitle>
                  <CardNumber>{totalOfficers}</CardNumber>
                </Card>
                <Card>
                  <CardTitle>Present</CardTitle>
                  <CardNumber>{presentOfficers}</CardNumber>
                </Card>
                <Card>
                  <CardTitle>Absent</CardTitle>
                  <CardNumber>{absentOfficers}</CardNumber>
                </Card>
                <Card>
                  <CardTitle>On Leave</CardTitle>
                  <CardNumber>{leaveRequests}</CardNumber>
                </Card>
              </CardsContainer>
            </ContentInner>
          </ContentWrapper>
        </CenteredContainer>
      </ContentArea>
    </PageWrapper>
  );
};

export default PetrolLeaderDashboardView;
