import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserInfoContext } from "../../contexts/UserContext";
import styled from "styled-components";
import axios from "axios";
import FooterComponent from "../../constants/Footer";
import HeaderComponent from "../../constants/Header";
import ProductComponent from "./ProductComponent";

export default function ProductPageIndex() {
  const { config } = useContext(UserInfoContext);
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);

    async function getProducts() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API_URL}/products/review/${productId}`,
          config
        );
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getProducts();
  }, []);

  return (
    <Container>
      <HeaderComponent />

      <ProductContainer>
        <ProductComponent product={product} config={config}/>
      </ProductContainer>

      <FooterComponent />
    </Container>
  );
}

//Styled Components
const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const ProductContainer = styled.div`
  display: flex;
  margin-bottom: 10vh;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
`;
