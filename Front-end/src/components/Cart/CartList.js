import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NiceButton from "../../constants/NiceButton";
import { FiTrash2 } from 'react-icons/fi';
import CartValue from "./CartValue";
import axios from "axios";
import swal from "sweetalert";

export default function CartList ({ purchases, setStatus, config }) {
    const navigate = useNavigate()
    const productsArray = purchases.map((p) => { return p.Products })

    async function deleteCartItem (id) {
        try {
            const promisse = await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/cart/${id}`, config)
            console.log(promisse)
            setStatus([])
        } catch (error) {
            console.log(error.response.data)
            swal({
                title: error.response.data,
                text: "Logue novamente, por favor! :)",
                icon: "error"
            })        
        }
    }

    async function postPurchase() {
        try {
            const teste = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/payment`, { productsArray }, config)
            window.location.href = teste.data
        } catch (error) {
            console.log(error.response.data)
            swal({
                title: error.response.data,
                text: "Logue novamente, por favor! :)",
                icon: "error"
            })        
        }
    }

    //Array de produtos do carrinho
    console.log(productsArray)

    return (
        <Container>
            <h1>Seu Carrinho</h1>
            <PurchaseList>
                {purchases.map((p, idx) => 
                    <PurchaseItem key={idx}>
                        <RightDiv>
                            <img onClick={() => navigate(`/product/${p.Products.id}`)} src={p.Products.image} alt={"Banner"}/>
                            {p.Products.name}
                        </RightDiv>

                        <LeftDiv>
                            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.Products.price)}</span>
                            <FiTrash2 onClick={() => { deleteCartItem(p.id) }}/>
                        </LeftDiv>
                    </PurchaseItem>
                )}
            </PurchaseList>

            <ConfirmPurchase>
                <CartValue purchases={purchases}/>
                <div onClick={postPurchase}><NiceButton purchases={purchases} setStatus={setStatus} content={"Confirmar Compra"} backgroundColor={'lightcoral'}/></div>
            </ConfirmPurchase>
        </Container>
    )
}

//Styled Components
const Container = styled.div`
    margin: 50px auto;
    width: 80vw;
    height: auto;
    display: flex;
    flex-direction: column;
    font-family: "Quicksand", sans-serif;
    color: #ffffff;    
    
    h1 {
        font-size: 50px;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.7);
        cursor: default;
        font-weight: 600;
    };
`
const PurchaseList = styled.ul`
    background-color: #5eb7b7;
    height: 50vh;
    margin-top: 20px;
    font-size: 25px;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 16px;
    }

    ::-webkit-scrollbar-track {
        background: #5eb7b7;
    }

    ::-webkit-scrollbar-thumb {
        background-color: white;
        border-radius: 10px;
        border: 3px solid #ffffff;
    }
`
const PurchaseItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 30%);

    img {
        cursor: pointer;
        border-radius: 5px;
        width: 60px;
        margin-right: 25px;
    }
`
const RightDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const LeftDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;

    svg {
        cursor: pointer;
        background-color: #f95a4e;
        padding: 10px;
        border-radius: 5px;
    }
`
const ConfirmPurchase = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`