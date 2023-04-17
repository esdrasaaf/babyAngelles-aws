import axios from "axios";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import NiceButton from "../../constants/NiceButton";
import { UserInfoContext } from "../../contexts/UserContext";

export default function PaymentSuccessIndex() {
    const navigate = useNavigate();
    const { purchaseId } = useParams();
    const { config } = useContext(UserInfoContext);

    async function deletePurchase() {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/payment/cancel/${purchaseId}`, config);
            navigate("/cart");
        } catch (error) {
            console.log(error);
            swal({
                title: error.response.data,
                text: "Logue novamente, por favor! :)",
                icon: "error"
            });
        }
    }

    return (
        <Container>
            <Div>         
                <img src="https://media.giphy.com/media/uizkUT3jl96wCG2VxV/giphy.gif" alt="baby happy" />

                <Box>
                    <h3>
                        {"Que pena :("}
                    </h3>
                    
                    <p>Sua compra foi cancelada!</p>
                
                    <div onClick={deletePurchase}><NiceButton content={"Voltar para carrinho"} backgroundColor={"lightcoral"}/></div>
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
        border-radius: 20px;
    }
`

const Div = styled.div`
    width: 50vw;
    background: #fff; 
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 30px;
    padding: 40px;
`

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    margin-top: 40px;

    h3 {
        font-size: 30px;
        margin-bottom: 10px;
    } 

    div {
        margin-top: 30px;
    } 
`