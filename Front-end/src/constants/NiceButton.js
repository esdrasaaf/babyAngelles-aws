import styled from "styled-components";

export default function NiceButton({ content, backgroundColor }) {
  
  return <Button backgroundColor={backgroundColor}>{content}</Button>;
}

//Styled Components
const Button = styled.button`
    all: unset;
    width: fit-content;
    min-width: 100px;
    height: 20px;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    background: transparent;
    border: none;
    position: relative;
    color: #f0f0f0;
    cursor: pointer;
    z-index: 1;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;

    ::after,
    ::before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: -99999;
      transition: all .4s;
    }
    
    ::before {
      transform: translate(0%, 0%);
      width: 100%;
      height: 100%;
      background-color: ${props => props.backgroundColor};
      border-radius: 10px;
    }
    
    ::after {
      transform: translate(10px, 10px);
      width: 35px;
      height: 35px;
      background: #ffffff15;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border-radius: 50px;
    }
    
    :hover::before {
      transform: translate(5%, 20%);
      width: 110%;
      height: 110%;
    }
    
    :hover::after {
      border-radius: 10px;
      transform: translate(0, 0);
      width: 100%;
      height: 100%;
    }
    
    :active::after {
      transition: 0s;
      transform: translate(0, 5%);
    }
`;
