import styled from "styled-components";
import swal from "sweetalert";
import LoginButton from './NiceButton';

export default function FooterComponent() {
    return (
        <Container>
            <BackToTop>
                <button onClick={() => { window.scrollTo(0, 0); }}>Voltar para o início</button>
            </BackToTop>

            <Informations>
                <h1>Quem somos?</h1>
                <span>A nossa história começou quando uma mulher forte e sonhadora, decidiu montar seu próprio comércio, uma lojinha de roupas infantis. 
                        Com um início difícil, mas sem abaixar a cabeça, "Anathusia Ângelles", CEO da Ângelles Store, foi de pouco em pouco crescendo no ramo. 
                        Seu amor por crianças, foi fundamental para o crescimento da marca, que se preocupa fortemente com o conforto e o bem-estar dos pequeninos.
                        Desde então, estamos fornecendo os melhores produtos do mercado e seguimos fortes para manter o nosso padrão de qualidade.
                </span>

                <div>
                    <p onClick={() => swal({title: "Função em desenvolvimento", icon: 'info'})}>
                        <LoginButton content={'Contatos'} backgroundColor={'#5AA897'} />
                    </p>
                    <p onClick={() => swal({title: "Função em desenvolvimento", icon: 'info'})}>
                        <LoginButton content={'Pagamentos'} backgroundColor={'#5AA897'} />
                    </p>
                    <p onClick={() => swal({title: "Função em desenvolvimento", icon: 'info'})}>
                        <LoginButton content={'Suporte'} backgroundColor={'#5AA897'} />
                    </p>
                </div>
            </Informations>

            <Localization>
                <div>{`Praça Cláudio Gervásio Furtado, 214 - Cuité/PB, CEP: 58175-00`}</div>
                <div>{`© 2023 AngellesStore.com, Inc.`}</div>
            </Localization>
        </Container>
    )
}

const Container = styled.footer`
    background-color: #006A71;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;
`
const BackToTop = styled.div`
    height: 15%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        width: 100%;
        height: 100%;
        background-color: #5EB7B7;
        border: none;
        cursor: pointer;
        font-size: 17.5px;
        font-weight: 500;
        font-family: 'Lexend Deca', sans-serif;
        color: white;

        :hover {
            background-color: #5EB7B7;
            opacity: 0.7;
            transition: ease-in-out, 0.3s;
        }
    }
`
const Informations = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60%;
    width: 100%;

    h1 {
        text-align: center;
        color: white;
        font-size: 20px;
    }

    span {
        font-size: 15px;
        text-align: justify;
        text-indent: 20px;
        margin-top: 15px;
        width: 50%;
        color: white;
        text-align: justify;
        text-indent: 25px;
        word-spacing: 0.2px;
        line-height: 20px;
    }

    div {
        height: 20%;
        width: 60%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 20px;
        margin-top: 30px;

        h1 {
            cursor: pointer;
            box-sizing: border-box;
            padding: 20px;
            background-color: whitesmoke;

            :hover {
                opacity: 0.7;
            }
        }
    }
`
const Localization = styled.div`
    background-color: #245953;
    height: 20%;
    width: 100%;
    font-size: 15px;
    font-family: 'Lexend Deca', sans-serif;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 30px;
    box-sizing: border-box;
    color: white;
`