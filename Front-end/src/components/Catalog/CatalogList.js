import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AverageRatingComponent from './AverageProductRating';

export default function CatalogListComponent ({ config, catalog }) {
    const navigate = useNavigate();

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
            <h1>Catálogo</h1>

            <List>
                {
                    catalog.length === 0
                    ?
                    <p>{"Não temos produtos com esta filtragem! :("}</p>
                    :
                    catalog.map((p, idx) => {
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
        </Container>
    )
}

//Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: fit-content;
  padding: 25px 30px;
  box-sizing: border-box;
  gap: 50px;

  h1 {
        font-size: 40px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 700;
        color: #006A71;
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