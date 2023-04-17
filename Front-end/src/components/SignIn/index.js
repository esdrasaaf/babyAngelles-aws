import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import loginBackground from "../../assets/images/loginBackground.jpg";
import logoLogin from "../../assets/images/logoLogin.png"
import olhoAberto from "../../assets/images/olhoAberto.svg"
import olhoFechado from "../../assets/images/olhoFechado.svg"
import LoginButton from "../../constants/NiceButton";
import swal from 'sweetalert';
import axios from 'axios';
import { UserInfoContext } from '../../contexts/UserContext';

export default function SignInIndex() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setTopicStatus } = useContext(UserInfoContext);

  useEffect (() => {
    if (localStorage.getItem("token")) navigate("/home");
  }, [])

  async function postLogin (e) {
    e.preventDefault()

    try {
      const userDataWithToken = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/auth/sign-in`, { email, password });
      const userData = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/user`, { headers: { Authorization: `Bearer ${userDataWithToken.data.userToken}` } });

      setTokenAndPasswordOnLocalStorage(userDataWithToken);
      setUserDataOnLocalStorage(userData);

      navigate("/home");

      swal({
        title: `Bem vindo(a), ${userData.data.userName}!`,
        text: "Você logou com sucesso :)",
        icon: "success",
      });
    } catch (error) {
      console.log(error)
      swal({
        title: error.response.data,
        icon: "error",
      });
    }
  }

  function setTokenAndPasswordOnLocalStorage (userData) {
    localStorage.setItem("token", userData.data.userToken);

    const modifiedPassword = userData.data.userPassword?.replace(" ", '');
    let replacedPassword = '';

    for (let i = 0; i < modifiedPassword?.length; i++) {
        replacedPassword += "*";
    }

    localStorage.setItem('userPassword', replacedPassword);
  }

  function setUserDataOnLocalStorage (userData) {
    const emailParts = userData.data.userEmail?.split("@");
    const leftEmailContent = emailParts[0];
    const rigthEmailContent = emailParts[1];
    let censoredEmailName = '';
    let censoredEmailAddress = '';

    for (let i = 0; i < leftEmailContent.length; i++) {
        if (i <= 2) { 
            censoredEmailName += leftEmailContent[i];
        } else {
            censoredEmailName += "*";
        };
    }

    for (let i = 0; i < rigthEmailContent.length; i++) {
        if (i <= 2) { 
            censoredEmailAddress += rigthEmailContent[i] 
        } else {
          censoredEmailAddress += "*";
        };
    }

    localStorage.setItem("userId", userData.data.userId);
    localStorage.setItem("userName", userData.data.userName);
    localStorage.setItem("userPhoto", userData.data.userPhoto);
    localStorage.setItem('userEmail', censoredEmailName + "@" + censoredEmailAddress)
    setTopicStatus([]);
  }

  return (
    <Container>
      <FormContainer>
        <img className="logo" src={logoLogin} alt="Logo Login"/>

        <FormBox>
          <p>Bem-vindo</p>

          <LoginForm onSubmit={postLogin}>
              <input id="email" placeholder="E-mail" type="email" name="email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} required />
              <div>
                <input id="password" placeholder="Password" type={passwordIsVisible ? "password" : "text"} name="Password" onChange={(e) => setPassword(e.target.value)} required />
                <span><img onClick={() => { if (passwordIsVisible) setPasswordIsVisible(false); else setPasswordIsVisible(true) }} src={passwordIsVisible ? olhoAberto : olhoFechado}/></span>
              </div>
              <LoginButton onsUB type="submit" backgroundColor={'#68b0ab'} content={'Entrar'}/>
          </LoginForm>

          <h1>Primeira vez? <Link to={"/sign-up"}>Cadastre-se aqui!</Link></h1> 
        </FormBox>
      </FormContainer>

      <img className="background" src={loginBackground} />
    </Container>
  );
}

//Styled Components
const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1300px) {
    justify-content: center;
    position: relative;
    padding-top: 80px;

    .background {
      display: none;
    }

    .logo {
      width: 20%;
      height: 20%;
      position: absolute;
      z-index: 2;
      top: 10%;
    }
  }

  @media (max-width: 1000px) {
    padding-top: 0px;

    .logo {
      width: 200px;
      height: 150px;
      position: initial;
      margin-bottom: 50px;
    }
  }

  img {
    height: 100vh;
    width: 70%;
    border-radius: 50px 0px 0px 50px;
    box-shadow: -15px 3px 15px -7px rgba(140,140,140,1);
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;

  p {
    font-family: 'Quicksand', sans-serif;
    font-size: 40px;
    font-weight: 600;
    color: #FF7E67;
    width: 90%;
    margin-bottom: 40px;
    cursor: default;
    text-align: center;
  }
`

const FormContainer = styled.div`
  background-color: #AEE1E1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100vh;

  img {
    height: 270px;
    margin-bottom: 15%;
    box-shadow: none;
  }
  
  a {
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 15px;
    color: #FF7E67;
    text-decoration: underline;
  }

  h1 {
    margin-top: 30%;
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 15px;
    color: #FF7E67;
    cursor: default;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 15px;

  div {
    position: relative;
  }

  span {
    position: absolute;
    right: 10px;
    bottom: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        margin-bottom: 0px;
        border-radius: 0px;
        cursor: pointer;
        height: 35px;
        width: 25px;
    }
  }

  input {
    height: 50px;
    width: 300px;
    border-radius: 12.5px;
    box-sizing: border-box;
    border: none;
    padding-left: 40px;
    background-color: #ECF4F3;
    font-family: 'Montserrat';
    font-weight: 500;
    font-size: 15px;
    color: rgba(74,74,74,1);
  }

  #email {
    box-sizing: border-box;
    background-image: url("https://cdn1.iconfinder.com/data/icons/document-edit-line/64/Document-doc-file-email-message-order-paper-256.png");
    background-repeat: no-repeat;
    background-position: left;
    background-position-x: 4.5%;
    background-size: 20px;
  }

  #password {
    box-sizing: border-box;
    background-image: url("https://cdn4.iconfinder.com/data/icons/basic-ui-line-3/24/UI-lock-256.png");
    background-repeat: no-repeat;
    background-position: left;
    background-position-x: 4.5%;
    background-size: 20px;
  }
`;
