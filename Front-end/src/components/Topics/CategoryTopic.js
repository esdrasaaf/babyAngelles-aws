import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoMdOptions } from "react-icons/io";

export default function CategoryTopicComponent({ title, contentArray }) {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>
        <IoMdOptions />
        {title}
      </h1>

      <List>
        {contentArray.map((c, idx) => {
          return (
            <ListCard key={idx} onClick={() => navigate(`/category/${c.id}`)}>
              <img src={c.image} alt="fotozinha ai" />
              <span>{c.name}</span>
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
    display: flex;
    justify-content: center;
  }

  svg {
    height: 30px;
    width: 30px;
    margin-right: 10px;
    transform: rotate(180deg);
  }
`;
const List = styled.ul`
  background-color: #5eb7b7;
  width: 100%;
  height: 330px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;
  gap: 80px;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 0 5px 0 0;

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
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 30px;
  box-sizing: border-box;
  padding: 15px;
  flex-shrink: 0;
  border-radius: 15px;
  font-family: "Lexend Deca", sans-serif;
  font-size: 20px;
  color: #408e91;
  font-weight: 600;
  letter-spacing: 0.5px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  img {
    height: 150px;
    width: 150px;
    border-radius: 100px;
  }
`;
