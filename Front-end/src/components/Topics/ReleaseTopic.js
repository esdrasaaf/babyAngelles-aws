import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsStars } from "react-icons/bs";
import axios from "axios";

export default function ReleaseTopicComponent({ title, contentArray, config }) {
  const navigate = useNavigate();

  async function addProductToHistoric (productId) {
    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/browsingHistory`, { productId }, config);;
        navigate(`/product/${productId}`);
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Container>
      <h1>
        <BsStars />
        {title}
      </h1>

      <List>
        {contentArray.map((c, idx) => {
          return (
            <ListCard key={idx} onClick={() => addProductToHistoric(c.id)}>
              <img src={c.image} alt="fotozinha ai" />

              <div>
                <span>{c.name}</span>
                <span>Preço: R$ {c.price}</span>
              </div>
            </ListCard>
          );
        })}
      </List>
    </Container>
  );
}

//Styled Components
const Container = styled.div`
  width: 100%;

  h1 {
    background-color: #FCD1D1;
    width: fit-content;
    font-family: "Quicksand", sans-serif;
    font-size: 30px;
    color: #FC7978;
    padding: 20px;
    border-radius: 15px 15px 0px 0px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: default;
    display: flex;
    justify-content: center;
  }

  svg {
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }
`;
const List = styled.ul`
  background-color: #FCD1D1;
  width: 100%;
  height: 390px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;
  gap: 80px;
  padding: 30px;
  border-radius: 0 5px 0 0;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background: #FCD1D1;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #fcd1d1;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }
`;
const ListCard = styled.li`
  background-color: whitesmoke;
  width: 200px;
  height: 100%;
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
    height: 22%;
    font-family: "Lexend Deca", sans-serif;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 1px;
    color: white;
    margin-bottom: 8px;

    span {
      text-align: center
    }
  }

  img {
    margin-top: 8px;
    height: 170px;
    width: 90%;
    border-radius: 10px;
  }
`;
