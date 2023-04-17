import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiOutlineBookmark } from "react-icons/hi";
import { BsBookmarkFill } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import styled from "styled-components";
import swal from "sweetalert";
import NiceButton from "../../constants/NiceButton";
import Star from "../../assets/images/ratingStar.png"
import getAverage from "./GetAvg";
import Rating from 'react-rating';
import emptyStar from '../../assets/images/emptyStar.png';
import ratingStar from '../../assets/images/ratingStar.png';

export default function ProductComponent({ product, config }) {
  const navigate = useNavigate();
  const [savedProducts, setSavedProducts] = useState({});
  const [avaliationList, setAvaliationList] = useState([]);
  const [avaliationText, setAvaliationText] = useState("");
  const [avaliationStar, setAvaliationStar] = useState(0);
  const [status, setStatus] = useState([]);
  const [avaliationStatus, setAvaliationStatus] = useState(false);
  const { productId } = useParams();
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
    
    async function getSavedProductsAndAvaliations () {
      try {
        const hash = {};
        const saves = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/saves`, config);
        const avaliations = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/avaliations/product/${productId}`, config);

        for (let i = 0; i < saves.data.length; i++) {
          hash[saves.data[i].productId] = true
        };

        setSavedProducts(hash);
        setAvaliationList(avaliations.data);
        setAvg(getAverage(avaliations.data).toFixed(1))
      } catch (error) {
        console.log(error)
      }      
    };

    getSavedProductsAndAvaliations();
  }, [status, avg]);

  async function addProductOnCart(id) {
    try {
      const promisse = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/cart`, {productId: id}, config);
      
      swal({
        title: "Produto adicionado com sucesso!",
        text: promisse.data,
        icon: "success"
      })
  } catch (error) {
      console.log(error.response.data)
      swal({
          title: error.data,
          text: "Logue novamente, por favor! :)",
          icon: "error"
      })        
  }
  }

  async function addAvaliation(e) {
    e.preventDefault()

    try {
      const promisse = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/avaliations`, {rating: avaliationStar, avaliation: avaliationText, productId: Number(productId)}, config);
      setStatus([]);
      setAvaliationStatus(false);
      setAvaliationStar(0)
      setAvaliationText("")

      swal({
        title: "Avaliação adicionada com sucesso!",
        icon: "success"
      })
  } catch (error) {
      console.log(error.response.data)
      swal({
          title: error.data,
          text: "Logue novamente, por favor! :)",
          icon: "error"
      })        
  }
  }

  async function saveProduct(id) {
    try {
      const promisse = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/saves`, {productId: id}, config);
      setStatus([]);

      swal({
        title: promisse.data,
        icon: "success"
      })
    } catch (error) {
        console.log(error.response.data)
        swal({
            title: error.data,
            text: "Logue novamente, por favor! :)",
            icon: "error"
        })        
    }
  }

  async function deleteAvaliation(avaliationId) {
    try {
      const promisse = await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/avaliations/${avaliationId}`, config);
      setStatus([]);

      swal({
        title: promisse.data,
        icon: "success"
      })
    } catch (error) {
        console.log(error.response.data)
        swal({
            title: error.data,
            text: "Logue novamente, por favor! :)",
            icon: "error"
        })        
    }
  }

  return (
    <Container>
      <ProductContainer>
        <img src={product.image} />

        <ProductInfo isSaved={savedProducts[product.id]}>
          {savedProducts[product.id] ? <BsBookmarkFill onClick={() => saveProduct(product.id)}/> : <HiOutlineBookmark onClick={() => saveProduct(product.id)}/>}

          <h1>{product.name} </h1>

          <div>
            <h2>Cor: {product?.Colors?.name}</h2>
            <h2>Categoria: {product?.Categories?.name}</h2>
            <h2>Marca: {product?.Brands?.name}</h2>
            <h2>Preço: R$ {product.price}</h2>
          </div>

          <span>{product.description}</span>

          <ul onClick={() => { addProductOnCart(product.id) }}>
            <NiceButton
              content={"Adicionar ao carrinho"}
              backgroundColor={"#FC7978"}
            />
          </ul>
        </ProductInfo>
      </ProductContainer>

      <AvaliationSection>
        <h1>
          Avaliações deste produto: ({avg} Estrelas) 
          
          <div onClick={() => {
            if (!avaliationStatus) {
              setAvaliationStatus(true)
            } else {
              setAvaliationStatus(false)
              setAvaliationStar(0)
              setAvaliationText("")
            }
          }}>
            <NiceButton
              content={avaliationStatus ? "Descartar avaliação" : "Adicionar avaliação"}
              backgroundColor={"#FC7978"}
            />
          </div>
        </h1>
        
        {
          avaliationStatus
          ?
          <AddAvaliationForm onSubmit={addAvaliation}>
            <div>
              <input value={avaliationText} placeholder="Deixe aqui sua avaliação sobre este produto." onChange={(e) => {setAvaliationText(e.target.value)}}/>
              <Rating
                initialRating={avaliationStar}
                onChange={(value) => {setAvaliationStar(value)}}
                emptySymbol={<img src={emptyStar} className="icon" />}
                fullSymbol={<img src={ratingStar} className="icon" />}
              />
              <button>enviar</button>
            </div>
          </AddAvaliationForm>
          :
          <></>
        }

        <AvaliationList>
          {
            avaliationList.length === 0
            ?
            <EmptyList>
                <span>
                    {`Este produto ainda não recebeu avaliações! :)`}
                </span>
            </EmptyList>
            :
            avaliationList.map((a, idx) => {
                return (
                    <AvaliationCard key={idx}>
                        <div>
                          <Comment>
                            <img src={a.User.image ? a.User.image : "https://img.freepik.com/vetores-premium/icone-de-circulo-de-usuario-anonimo-estilo-simples-de-ilustracao-vetorial-com-sombra-longa_520826-1931.jpg"} alt="user image"/>
                            <div>
                              <h2>{a.User.name}</h2>
                              <span>{a.avaliation}</span>
                            </div>
                          </Comment>

                          {
                            a.User.id === Number(localStorage.getItem("userId"))
                            ?
                            <RatingWithLogout>
                              <RatingDiv>
                                <h1>{a.rating}</h1>
                                <img src={Star}/>
                              </RatingDiv>

                              <FiTrash2 onClick={() => { deleteAvaliation(a.id) }}/>
                            </RatingWithLogout>
                            :
                            <RatingDiv>
                              <h1>{a.rating}</h1>
                              <img src={Star}/>
                            </RatingDiv>
                          }
                        </div>
                    </AvaliationCard>
                )
            })
          }
        </AvaliationList>
      </AvaliationSection>
    </Container>
  );
}

//Styled Components
const Container = styled.div`
  height: auto;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 45px;
`;

const ProductInfo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: "Quicksand", sans-serif;
  position: relative;

  svg {
    position: absolute;
    top: -5px;
    right: 0;
    font-size: 50px;
    color: ${props => props.isSaved ? "#ffff2e" : "white"};
    cursor: pointer;
  }

  h1 {
    font-size: 40px;
    font-weight: 600;
    margin-bottom: 20px;
    color: white;
    cursor: default;
  }

  span {
    background-color: #ECF4F3;
    box-sizing: border-box;
    padding: 15px;
    border-radius: 20px;
    width: 100%;
    height: fit-content;
    font-size: 18px;
    font-weight: 600;
    text-align: justify;
    text-indent: 25px;
    word-spacing: 0.2px;
    line-height: 20px;
    color: #006A71;
    cursor: default;
    max-height: 140px;
    overflow-y: auto;

    ::-webkit-scrollbar {
        width: 16px;
    }

    ::-webkit-scrollbar-track {
        background: #ECF4F3;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #fcd1d1;
        border-radius: 10px;
        border: 3px solid #ffffff;
    }
  }

  div {
    background-color: lightcoral;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 40%;
    font-size: 25px;
    font-weight: 500;
    color: white;
    border: 1px solid white;
    box-sizing: border-box;
    cursor: default;

    h2 {
      width: 50%;
      height: 50%;
      display: flex;
      justify-content: start;
      align-items: center;
      border: 2px solid white;
      box-sizing: border-box;
      padding-left: 15px;
    }
  }
`;

const ProductContainer = styled.div`
  background-color: #5eb7b7;
  display: flex;
  gap: 9%;
  height: 63vh;
  width: 90%;
  padding: 65px;
  border-radius: 50px;

  img {
    height: 550px;
    width: 450px;
    border-radius: 20px;
  }
`;

const AvaliationSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-top: 40px;
  background-color: #5eb7b7;
  border-radius: 50px;
  padding-bottom: 40px;

  h1 {
      margin-left: 20px;
      font-size: 40px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      color: white;
      text-align: start;
      padding: 40px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        margin-right: 20px;
      }
  }
`;

const AvaliationList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;

  ::-webkit-scrollbar {
        width: 16px;
    }

    ::-webkit-scrollbar-track {
        background: #5eb7b7;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #fcd1d1;
        border-radius: 10px;
        border: 3px solid #ffffff;
    }
`;

const AvaliationCard = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px 30px;
  width: 100%;
  height: auto;
  border-radius: 20px;

  div {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    width: fit-content;
    background-color: #96D1C7;
  }
`;

const EmptyList = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: "Quicksand", sans-serif;
    font-weight: 600;
    color: #ffffff;


    span {
        width: 50%;
        font-size: 25px;
        border-radius: 50px;
        cursor: default;
        gap: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 40px 20px 50px 20px;
    };
`;

const Comment = styled.div`
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
  width: auto;

  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 22px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    color: white;
    height: 90%;
    background-color: #006A71;
    align-items: start;
    padding: 10px 20px;

    h2 {
      margin-top: 10px;
    }

    span {
      font-size: 18px;
      flex-wrap: wrap;
      word-break: break-all;
      margin-bottom: 10px;
      text-align: justify;
      line-height: 30px;
      max-height: 100px;
      overflow-y: auto;
      
      ::-webkit-scrollbar {
          width: 16px;
      }

      ::-webkit-scrollbar-track {
          background: #ECF4F3;
      }

      ::-webkit-scrollbar-thumb {
          background-color: #fcd1d1;
          border-radius: 10px;
          border: 3px solid #ffffff;
      }
    }
  }

  img {
    height: 50px;
    width: 50px;
    border-radius: 100px;
  }
`;

const RatingDiv = styled.div`
  display: flex;
  gap: 14px;

  h1 {
      margin-left: 0px;
      font-size: 20px;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      color: white;
      text-align: start;
      padding: 0px;
      box-sizing: border-box;
    }

  img {
    height: 40px;
    width: 40px;
  }
`;

const RatingWithLogout = styled.div`
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 50px;
    color: red;
    cursor: pointer;
  }
`;

const AddAvaliationForm = styled.form`
  margin: 20px 40px;

  div {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    input {
      height: 60px;
      width: 70%;
      padding: 20px;
      box-sizing: border-box;
    }

    button {
      height: 40px;
      width: 15%;
      cursor: pointer;
    }
  }
`