import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NiceButton from "../../constants/NiceButton";

export default function NotFoundPageIndex() {
    const navigate = useNavigate();

    return (
        <Container>
            <Div >
                <FourZeroFour>
                    <h1>404</h1>
                </FourZeroFour>
                
                <img src="https://cdn.dribbble.com/users/1672945/screenshots/6204534/media/1ebf136483dbf3caa7d319119944afef.gif" alt="baby crying" />

                <Box>
                    <h3>
                        Talvez você esteja um pouco perdido
                    </h3>
                    
                    <p>A página que você procura não está disponível!</p>
                
                    <div onClick={() => { navigate("/home") }}><NiceButton content={"Voltar para home"} backgroundColor={"lightcoral"}/></div>
                </Box>
            </Div>
        </Container>
    )
}

//Styled Components
const Container = styled.section`
    height: 100vh;
    width: 100vw; 
    font-family: 'Lexend Deca', serif;
    display: flex;
    justify-content: center;
    align-items: center;

    img { 
        width: 300px;
    }
`

const Div = styled.div`
    width: 60vw;
    background: #fff; 
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 30px;
    padding: 30px;
`

const FourZeroFour = styled.div`
    h1 {
        font-size: 80px;
        text-align: center;
        margin-bottom: 30px;
    }
`

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;

    h3 {
        font-size: 30px;
        margin-bottom: 5px;
    } 

    div {
        margin-top: 20px;
    } 
`