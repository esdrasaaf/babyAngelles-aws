import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function PromoCarrousselComponent () {
    const [arrayOfPromos, setArrayOfPromos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        async function getPromo() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/promos`);
                setArrayOfPromos(response.data);
            } catch (error) {
                console.log(error);
            }
          }

        getPromo();
    }, [])

    const handleNext = () => {
      setCurrentIndex((currentIndex + 1) % arrayOfPromos.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((currentIndex + arrayOfPromos.length - 1) % arrayOfPromos.length);
    };

    return (
        <Container>
            <div>
                <StyledButton direction={"true"} onClick={handlePrev}><AiOutlineArrowLeft/></StyledButton>
                <Slider image={arrayOfPromos[currentIndex]} />
                <StyledButton direction={"false"} onClick={handleNext}><AiOutlineArrowRight/></StyledButton>
            </div>
        </Container>
    );
}

function Slider({ image }) {
    return <img src={image?.image} alt="slider image" />;
}

//Styled Components
const Container = styled.div`
    background-color: white;
    width: 80%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    box-sizing: border-box;
    padding: 39px;

    div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        img {
            height: 100%;
            width: 85%;
        } 
    }
`

const StyledButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    height: 100%;
    width: 7.5%;
    background-color: rgba(202, 234, 247, 0.8);
    border-radius: ${props => props.direction === "true" ? '20px 0px 0px 20px' : '0px 20px 20px 0px'};

    svg {
        font-size: 40px;
    }
`
