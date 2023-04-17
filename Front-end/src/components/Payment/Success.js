import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import NiceButton from "../../constants/NiceButton";
import swal from "sweetalert";
import { UserInfoContext } from "../../contexts/UserContext";
import axios from "axios";
import { useContext, useEffect } from "react";

export default function PaymentSuccessIndex() {
    const navigate = useNavigate();
    const { purchaseId } = useParams();
    const { config } = useContext(UserInfoContext);

    useEffect(() => {
        async function confirmPurchase () {
            try {
                await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/payment/confirm/${purchaseId}`, null, config);
    
                await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/payment/numberofsales/${purchaseId}`, null, config);
    
                await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/cart/clear/all`, config);
            } catch (error) {
                console.log(error);
                swal({
                    title: error.response.data.name,
                    text: "Logue novamente, por favor! :)",
                    icon: "error"
                });
            }
        }

        confirmPurchase();
    }, [])

    return (
        <Container>
            <Div>         
                <img src="https://cdn.dribbble.com/users/662463/screenshots/3920164/media/9913305a5b42f8fb0778788e42510ab5.gif" alt="baby happy" />

                <Box>
                    <h3>
                        {"Muito obrigado <3"}
                    </h3>
                    
                    <p>Sua compra foi efetuada com sucesso!</p>
                
                    <div onClick={() => navigate("/cart")}><NiceButton content={"Voltar para carrinho"} backgroundColor={"lightcoral"}/></div>
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