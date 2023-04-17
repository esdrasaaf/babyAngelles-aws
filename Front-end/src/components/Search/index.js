import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import FooterComponent from '../../constants/Footer';
import HeaderComponent from '../../constants/Header';
import { UserInfoContext } from '../../contexts/UserContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AverageRatingComponent from '../Catalog/AverageProductRating';

export default function SearchPageIndex () {
    const { config } = useContext(UserInfoContext);
    const [productList, setProductList] = useState([]);
    const { productName } = useParams();
    const navigate = useNavigate();

    async function addProductToHistoric (productId) {
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/browsingHistory`, { productId }, config);
            navigate(`/product/${productId}`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function getSearchProducts() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/products/search/${productName}`, config);
                setProductList(response.data);
            } catch (error) {
                console.log(error);
                setProductList([]);
            }
        }

        getSearchProducts();
    }, [productName]);

    return (
        <Container>
            <HeaderComponent />
            
            <MidContainer>
                <h1>Resultados da pesquisa por: {productName} </h1>

                <List>
                    {
                        productList.length === 0
                        ?
                        <p>{"Não temos produtos com este nome no estoque! :("}</p>
                        :
                        productList.map((p, idx) => {
                            return <ListCard key={idx} onClick={() => addProductToHistoric(p.id)}>
                                <img src={p.image} alt="fotozinha ai" />
                    
                                <div>
                                    <span>{p.name}</span>
                                    <span>Preço: R$ {p.price}</span>
                                    <AverageRatingComponent productAvaliations={p.Avaliations}/>
                                </div>
                            </ListCard>
                        })
                    }
                </List>
            </MidContainer>

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
const MidContainer = styled.div`
    min-height: 95vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px 0px;
    box-sizing: border-box;
    justify-content: flex-start;

    h1 {
        font-size: 40px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        color: #006A71;
        text-align: center;
        margin-bottom: 65px;
    }
`;
const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;

  p {
    font-size: 27px;
    font-family: 'Lexend Deca', sans-serif;
    color: #006A71;
  }
`;
const ListCard = styled.li`
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