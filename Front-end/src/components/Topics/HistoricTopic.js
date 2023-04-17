import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdHistoryEdu } from "react-icons/md";
import axios from "axios";
import swal from "sweetalert";

export default function HistoricTopicComponent({ title, contentArray, config, setTopicStatus }) {
  const navigate = useNavigate();

  async function addProductToHistoric(productId) {
    try {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/browsingHistory`, { productId }, config);
        navigate(`/product/${productId}`);
    } catch (error) {
        console.log(error);
    }
  };

  function deleteProductToHistoric(historicId) {
    swal({
      title: "Você deseja apagar esse item do seu histórico?",
      icon: "info",
      buttons: true,
      dangerMode: false,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/browsingHistory/${historicId}`, config);
          setTopicStatus([])
        } catch (error) {
            console.log(error);
        } 
      } else {
          swal("OK! Segue tudo do jeito que está! :)");
      }})
  };

  return (
    <Container>
      <h1>
        <MdHistoryEdu />
        {title}
      </h1>

      <List>
        {contentArray.map((c, idx) => {
          return (
            <ListCard key={idx}>
              <h2 onClick={() => deleteProductToHistoric(c.id)}> X </h2>
              <img src={c.Products.image} alt="fotozinha ai" onClick={() => addProductToHistoric(c.Products.id)}/>

              <div onClick={() => addProductToHistoric(c.Products.id)}>
                <span>{c.Products.name}</span>
                <span>Preço: R$ {c.Products.price}</span>
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
    display: flex;
    justify-content: center;
    background-color: #5eb7b7;
    width: fit-content;
    font-family: "Quicksand", sans-serif;
    font-size: 30px;
    color: white;
    padding: 20px;
    border-radius: 15px 15px 0px 0px;
    font-weight: 600;
    letter-spacing: 0.8px;
    cursor: default;
  }

  svg {
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }
`;
const List = styled.ul`
  background-color: #5eb7b7;
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
    background: #5eb7b7;
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
  position: relative;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  h2 {
    background-color: red;
    font-family: "Lexend Deca", sans-serif;
    font-size: 15px;
    font-weight: 600;
    color: white;
    width: 16%;
    height: 10%;
    border-radius: 100px;
    padding: 3px;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: -10px;
    right:  -10px;
    z-index: 2;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    background-color: #408e91;
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
