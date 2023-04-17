import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FooterComponent from "../../constants/Footer";
import HeaderComponent from "../../constants/Header";
import TopicIndex from "../Topics";
import PromoCarrousselComponent from "./PromoCarroussel";

export default function HomePageIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, []);

  return (
    <Container>
      <HeaderComponent />

      <MidContent>
        <PromoCarrousselComponent />
        <TopicIndex />
      </MidContent>

      <FooterComponent />
    </Container>
  );
}

//Styled Components
const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const MidContent = styled.div`
  background-color: #AEE1E1;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 80px 0;
  gap: 100px;
`;
