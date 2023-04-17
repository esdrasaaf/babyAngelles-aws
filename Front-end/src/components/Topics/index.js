import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserInfoContext } from "../../contexts/UserContext";
import BestSellerTopicComponent from "./BestSellerTopic";
import CategoryTopicComponent from "./CategoryTopic";
import HistoricTopicComponent from "./HistoricTopic";
import ReleaseTopicComponent from "./ReleaseTopic";

export default function TopicIndex () {
    const { config, topicStatus, setTopicStatus } = useContext(UserInfoContext);
    const [bestSellers, setBestSellers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [releases, setReleases] = useState([]);
    const [historic, setHistoric] = useState([]);

    useEffect(() => {
        async function getTopics() {
            try {
                const categoriesResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/categories`);
                const bestSellersResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/products/bestsellers`, config);
                const releasesResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/products/releases`, config);
                const historicResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/browsingHistory`, config);

                setCategories(categoriesResponse.data);
                setBestSellers(bestSellersResponse.data);
                setReleases(releasesResponse.data);
                setHistoric(historicResponse.data);
            } catch (error) {
                console.log(error);
            }
        }

        getTopics();
    }, [topicStatus])

    return (
        <Container>
            <BestSellerTopicComponent title={"Mais Vendidos"} contentArray={bestSellers} config={config}/>

            <CategoryTopicComponent title={"Navegue por categorias"} contentArray={categories}/>

            <ReleaseTopicComponent title={"Lançamentos"} contentArray={releases} config={config}/>

            <HistoricTopicComponent title={"Histórico de navegação"} contentArray={historic} config={config} setTopicStatus={setTopicStatus}/>
        </Container>
    );
}

//Styled Components
const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 100px;
`