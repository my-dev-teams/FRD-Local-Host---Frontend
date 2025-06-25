import React from "react";
import styled from "styled-components";


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

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("https://images.unsplash.com/photo-1531496660071-5ad1c2b6c4a4?auto=format&fit=crop&w=1470&q=80");
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: 0;
  }
`;

const ContentInner = styled.div`
  position: relative;
  z-index: 1;
  border-radius: 16px;
  padding: 20px;
  color: #1e293b;
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
  align-items: center;
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

const AdminView = () => {
  const totalOfficers = 10;
  const present = 5;
  const absent = 4;
  const leaved = 1;

  return (
    <>
      
      <PageWrapper>
       
        <ContentArea>
          <CenteredContainer>
            <ContentWrapper>
              <ContentInner>
                <Header>Admin Dashboard</Header>
                <CardsContainer>
                  <Card>
                    <CardTitle>Total Officers</CardTitle>
                    <CardNumber>{totalOfficers}</CardNumber>
                  </Card>
                  <Card>
                    <CardTitle>Present Today</CardTitle>
                    <CardNumber>{present}</CardNumber>
                  </Card>
                  <Card>
                    <CardTitle>Absent</CardTitle>
                    <CardNumber>{absent}</CardNumber>
                  </Card>
                  <Card>
                    <CardTitle>On Leave</CardTitle>
                    <CardNumber>{leaved}</CardNumber>
                  </Card>
                </CardsContainer>
              </ContentInner>
            </ContentWrapper>
          </CenteredContainer>
        </ContentArea>
      </PageWrapper>
    </>
  );
};

export default AdminView;
