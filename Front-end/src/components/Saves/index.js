import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FooterComponent from "../../constants/Footer";
import HeaderComponent from "../../constants/Header";
import NiceButton from "../../constants/NiceButton";
import { UserInfoContext } from "../../contexts/UserContext";
import AverageRatingComponent from "../Catalog/AverageProductRating";

export default function SavesIndexPage() {
    const { config } = useContext(UserInfoContext)
    const [savedProductsList, setList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getSavedProducts () {
            try {
              const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/saves`, config);
              setList(response.data)
            } catch (error) {
              console.log(error)
            }      
          };
      
          getSavedProducts();
    }, []);

    async function addProductToHistoric (productId) {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/browsingHistory`, { productId }, config);
            navigate(`/product/${productId}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <HeaderComponent />

            <MidContent>
                <h1>Lista de Salvos</h1>

                <SavedList>
                    {
                        savedProductsList.length === 0
                        ?
                        <EmptyList>
                            <span>
                                {`Sua lista está vazia! Procure por novos produtos no catálogo! :)`}
                                <div onClick={() => { navigate("/catalog"); }}><NiceButton content={"Página do Catálogo"}  backgroundColor={"#FFAFB0"}/></div>
                            </span>
                        </EmptyList>
                        :
                        savedProductsList.map((p, idx) => {
                            return (
                                <ProductCard key={idx} onClick={() => addProductToHistoric(p.Products.id)}>
                                    <img src={p.Products.image} alt="fotozinha ai" />
                        
                                    <div>
                                        <span>{p.Products.name}</span>
                                        <span>Preço: R$ {p.Products.price}</span>
                                        <AverageRatingComponent productAvaliations={p.Products.Avaliations}/>
                                    </div>
                                </ProductCard>
                            )
                        })
                    }
                </SavedList>
            </MidContent>

            <FooterComponent />
        </Container>
    )
}

//Styled Components
const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
const MidContent = styled.div`
    min-height: 95vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px 0px;
    box-sizing: border-box;
    justify-content: start;

    h1 {
        font-size: 40px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        color: #006A71;
        margin-bottom: 40px;
        text-align: center;
    }
`;
const SavedList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
`;
const ProductCard = styled.li`
  background-color: whitesmoke;
  width: 200px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
  padding: 15px;
  flex-shrink: 0;
  border-radius: 15px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    background-color: #FC7978;
    width: 90%;
    height: 25%;
    font-family: "Lexend Deca", sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 1px;
    color: white;
    margin-bottom: 8px;

    span {
      text-align: center
    }

    img {
        height: 20px;
        width: 20px;
        margin-top: 0px;
        border-radius: 0px;
    }
  }

  img {
    margin-top: 8px;
    height: 170px;
    width: 90%;
    border-radius: 10px;
  }
`;
const EmptyList = styled.div`
    width: 80vw;
    height: auto;
    display: flex;
    flex-direction: column;
    font-family: "Quicksand", sans-serif;
    font-weight: 600;
    color: #ffffff;

    span {
        margin-top: 30px;
        background-color: #5eb7b7;
        font-size: 25px;
        padding: 30px;
        border-radius: 10px;
        cursor: default;
        gap: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    };
` ;