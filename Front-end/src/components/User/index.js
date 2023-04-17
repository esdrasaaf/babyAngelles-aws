import FooterComponent from "../../constants/Footer";
import HeaderComponent from "../../constants/Header";
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert";
import { AiOutlineCamera } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../contexts/UserContext";
import UserAvaliationsComponent from "./UserAvaliations";
import UserPurchasesComponent from "./UserPurchases";

export default function UserPageIndex () {
    let newImage = '';
    let newName = '';
    let newEmail = '';
    let newPassword = '';

    const navigate = useNavigate();
    const { config } = useContext(UserInfoContext);
    const [status, setStatus] = useState([]);
    const [avaliations, setAvaliations] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [newImageState, setNewImage] = useState(localStorage.getItem("userPhoto"));
    const [newNameState, setNewName] = useState(localStorage.getItem("userName"));
    const [newEmailState, setNewEmail] = useState(localStorage.getItem("userEmail"));
    const [newPasswordState, setNewPassword] = useState(localStorage.getItem("userPassword"));

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/")
        }
        
        async function getData() {
            try {
                const userData = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/user`, config);
                const userAvaliations = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/avaliations/user`, config);
                const userPurchases = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/payment`, config);

                setAvaliations(userAvaliations.data);
                setPurchases(userPurchases.data);

                localStorage.setItem("userName", userData.data.userName);
                localStorage.setItem("userPhoto", userData.data.userPhoto);

                transformEmailToSetOnLocalStorage(userData.data.userEmail);
            } catch (error) {
                console.log(error)
            }
        }

        getData();
    }, [status]);

    function transformEmailToSetOnLocalStorage (userEmail) {
        const emailParts = userEmail.split("@");
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
    
        localStorage.setItem('userEmail', censoredEmailName + "@" + censoredEmailAddress)

        return censoredEmailName + "@" + censoredEmailAddress
    }

    function setPasswordOnLocalStorage (password) {
        const modifiedPassword = password.replace(" ", '');
        let replacedPassword = '';
    
        for (let i = 0; i < modifiedPassword?.length; i++) {
            replacedPassword += "*";
        }
    
        localStorage.setItem('userPassword', replacedPassword);
        return replacedPassword
    }

    async function updateUserData() {
        const userDataBody = {
            image: newImage,
            name: newName,
            email: newEmail,
            password: newPassword
        }
        
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/user`, { userDataBody }, config);
            setStatus([]);

            swal({
                title: "Dado atualizado com sucesso!",
                icon: "success",
            })
        } catch (error) {
            console.log(error)
            swal({
                title: "Algo deu errado com a atualização!",
                icon: "error",
            })
        }
    }

    async function logoutFunction() {
        try {     
            const response = await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/user`, config);
            console.log(response);
    
            localStorage.clear();
            setStatus([]);

            swal({
                title: "Você foi deslogado(a) com sucesso!",
                icon: "success",
            })
        } catch (error) {
            console.log(error)
            swal({
                title: "Algo deu errado com o logout!",
                icon: "error",
            }) 
        }
    }

    return (
        <Container>
            <HeaderComponent />
            
            <MidContent>
                <UserCard>
                    <UserInfos>
                        <UserPhoto>
                            <AiOutlineCamera onClick={() => {
                                        swal({
                                            title: "Você deseja alterar sua foto de perfil?",
                                            icon: "info",
                                            buttons: true,
                                            dangerMode: false,
                                        })
                                        .then((willChangin) => {
                                            if (willChangin) {
                                                swal({
                                                    title: "Qual será sua nova foto?",
                                                    content: "input",
                                                    button: {
                                                        text: "OK",
                                                        closeModal: false,
                                                    }
                                                })
                                                .then(image => {
                                                    if(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(image)) {
                                                        newImage = image;
                                                        setNewImage(image);
                                                        updateUserData();
                                                    } else {
                                                        return swal({ title: "Imagem inválida", icon: "error" })
                                                    }
                                                  });
                                            } else {
                                                swal("OK! Segue tudo do jeito que está! :)");
                                            }
                                        });
                                    }}/>

                            {localStorage.getItem('userPhoto') ? <img src={newImageState}/> : <img src="https://img.freepik.com/vetores-premium/icone-de-circulo-de-usuario-anonimo-estilo-simples-de-ilustracao-vetorial-com-sombra-longa_520826-1931.jpg" />}
                        </UserPhoto>

                        <UserNameAndLogout>
                            <div>
                                <h1>Minha Conta</h1>

                                <span>
                                    <h2>Nome:</h2>
                                    {localStorage.getItem('userName') ? newNameState : "Visitante"}
                                    <HiOutlinePencilAlt onClick={() => {
                                        swal({
                                            title: "Você deseja alterar seu nome de usuário?",
                                            icon: "info",
                                            buttons: true,
                                            dangerMode: false,
                                        })
                                        .then((willChangin) => {
                                            if (willChangin) {
                                                swal({
                                                    title: "Qual será seu novo nome?",
                                                    content: "input",
                                                    button: {
                                                        text: "OK",
                                                        closeModal: false,
                                                    }
                                                })
                                                .then(name => {
                                                    newName = name;
                                                    setNewName(name)

                                                    if (name.length < 3) {
                                                        return swal({
                                                            title: "Nome inválido",
                                                            icon: "error"
                                                        })
                                                    } else {
                                                        updateUserData();
                                                    }
                                                  });
                                            } else {
                                                swal("OK! Segue tudo do jeito que está! :)");
                                            }
                                        });
                                    }}/>
                                </span>

                                <span>
                                    <h2>Email:</h2>
                                    {localStorage.getItem('userEmail') ? newEmailState : "seuemail@.com"}
                                    <HiOutlinePencilAlt onClick={() => {
                                        swal({
                                            title: "Você deseja alterar seu email de usuário?",
                                            icon: "info",
                                            buttons: true,
                                            dangerMode: false,
                                        })
                                        .then((willChangin) => {
                                            if (willChangin) {
                                                swal({
                                                    title: "Qual será seu novo email?",
                                                    content: "input",
                                                    button: {
                                                        text: "OK",
                                                        closeModal: false,
                                                    }
                                                })
                                                .then(email => {
                                                    if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
                                                        newEmail = email;
                                                        const censoredEmail = transformEmailToSetOnLocalStorage(email);
                                                        setNewEmail(censoredEmail);
                                                        updateUserData();
                                                    } else {
                                                        return swal({ title: "Email inválido", icon: "error" })
                                                    }
                                                  });
                                            } else {
                                                swal("OK! Segue tudo do jeito que está! :)");
                                            }
                                        });
                                    }}/>
                                </span>

                                <span>
                                    <h2>Senha:</h2>
                                    {localStorage.getItem('userPassword') ? newPasswordState : "Sua senha"}
                                    <HiOutlinePencilAlt onClick={() => {
                                        swal({
                                            title: "Você deseja alterar a senha da sua conta?",
                                            icon: "info",
                                            buttons: true,
                                            dangerMode: false,
                                        })
                                        .then((willChangin) => {
                                            if (willChangin) {
                                                swal({
                                                    title: "Qual será sua nova senha?",
                                                    content: "input",
                                                    button: {
                                                        text: "OK",
                                                        closeModal: false,
                                                    }
                                                })
                                                .then(password => {
                                                    newPassword = password;

                                                    const censoredPassword = setPasswordOnLocalStorage(password);
                                                    setNewPassword(censoredPassword)

                                                    if (password.length < 6) {
                                                        return swal({
                                                            title: "Senha muito curta!",
                                                            icon: "error"
                                                        })
                                                    } else {
                                                        updateUserData();
                                                    }
                                                  });
                                            } else {
                                                swal("OK! Segue tudo do jeito que está! :)");
                                            }
                                        });
                                    }}/>
                                </span>
                            </div>

                            <LogoutSection>
                                <button onClick={() => {
                                        swal({
                                            title: "Você tem certeza que quer deslogar?",
                                            icon: "warning",
                                            buttons: true,
                                            dangerMode: false,
                                        })
                                        .then((willChangin) => {
                                            if (willChangin) {
                                                logoutFunction()
                                            } else {
                                                swal("OK! Segue tudo do jeito que está! :)");
                                            }
                                        });
                                    }}>
                                        Sair da conta
                                    </button>
                            </LogoutSection>
                        </UserNameAndLogout>
                    </UserInfos>
                </UserCard>

                <UserAvaliationsComponent avaliations={avaliations} />
                <UserPurchasesComponent purchases={purchases} />
            </MidContent>

            <FooterComponent />
        </Container>
    )
}

//Styled Components
const Container = styled.div`
`
const MidContent = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 80px;
    padding: 40px 0px;
`
const UserCard = styled.div`
    background-color: #006A71;
    height: 65vh;
    width: 60%;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 30px;
`
const LogoutSection = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0px;

    button {
        width: fit-content;
        background-color: #ffffff00;
        backface-visibility: hidden;
        border-bottom: 1px solid white;
        border-top: none;
        border-left: none;
        border-right: none;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        font-family: Circular,Helvetica,sans-serif;
        font-size: 22px;
        font-weight: 700;
        letter-spacing: -.01em;
        line-height: 1.3;
        padding-bottom: 10px;
        position: relative;
        text-align: left;
        text-decoration: none;
        transform: translateZ(0) scale(1);
        transition: transform .2s;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;

        :not(:disabled):hover {
            transform: scale(1.05);
        }

        :not(:disabled):hover:active {
            transform: scale(1.05) translateY(.125rem);
        }

        :focus {
            outline: 0 solid transparent;
        }

        :focus:before {
            content: "";
            left: calc(-1*.375rem);
            pointer-events: none;
            position: absolute;
            top: calc(-1*.375rem);
            transition: border-radius;
            user-select: none;
        }

        :focus:not(:focus-visible) {
            outline: 0 solid transparent;
        }

        :focus:not(:focus-visible):before {
            border-width: 0;
        }

        :not(:disabled):active {
            transform: translateY(.125rem);
        }
    }
`
const UserInfos = styled.div`
    height: 80%;
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
    border-radius: 20px;
    background-color: #5EB7B7;
`
const UserPhoto = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    height: 90%;
    border-radius: 20px;
    position: relative;
    
    img {
        height: 100%;
        width: 90%;
        border-radius: 20px;
    }

    svg {
        cursor: pointer;
        position: absolute;
        bottom: 0;
        background-color: #FFFFFF60;
        font-size: 50px;
        width: 90%;
        height: 15%;
        border-radius: 0px 0px 20px 20px;
        padding: 10px;
        box-sizing: border-box;
        color: white;
    }
`
const UserNameAndLogout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 50%;
    height: 90%;
    border-radius: 15px;
    padding: 10px;
    box-sizing: border-box;

    div {
        display: flex;
        width: 80%;
        height: 45%;
        gap: 15px;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;

        h1 {
            font-size: 40px;
            font-family: 'Quicksand', sans-serif;
            font-weight: 600;
            color: white;
            margin-bottom: 20px;
        }

        h2 {
            font-size: 25px;
            font-family: 'Quicksand', sans-serif;
            font-weight: 500;
            color: white;
            letter-spacing: 0px;
        }

        span {
            font-size: 18px;
            font-family: 'Quicksand', sans-serif;
            font-weight: 600;
            width: 100%;
            text-align: center;
            flex-wrap: wrap;
            padding: 10px 20px;
            border-radius: 20px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            letter-spacing: 1px;
            margin-bottom: 5px;

            svg {
                font-size: 35px;
                cursor: pointer;
            }
        }


    }

`