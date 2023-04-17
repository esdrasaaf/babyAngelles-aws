import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import FooterComponent from '../../constants/Footer';
import HeaderComponent from '../../constants/Header';
import CatalogListComponent from './CatalogList';
import { UserInfoContext } from '../../contexts/UserContext';
import SideFiltersComponents from './SideFiltersList';
import axios from 'axios';

export default function CatalogPageIndex () {
    const { config } = useContext(UserInfoContext);
    const [catalog, setCatalog] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [colorIds, setColorIds] = useState([]);
    const [brandIds, setBrandIds] = useState([]);
    const [status, setStatus] = useState([]);

    const body = { 
        productsFilter: {
            categoryIds,
            colorIds,
            brandIds
        }
    }

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/products`, body, config);
                setCatalog(response.data);
            } catch (error) {
                console.log(error);
                setCatalog([]);
            }
        }

        getProducts();
    }, [status]);

    return (
        <Container>
            <HeaderComponent />
            
            <MidContainer>
                <SideFiltersComponents
                    setCategoryIds={setCategoryIds} 
                    setColorIds={setColorIds} 
                    setBrandIds={setBrandIds} 
                    categoryIds={categoryIds}
                    colorIds={colorIds}
                    brandIds={brandIds}
                    setStatus={setStatus}
                />
                <CatalogListComponent config={config} catalog={catalog}/>
            </MidContainer>

            <FooterComponent />
        </Container>
    )
}

//Styled Components
const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
const MidContainer = styled.div`
    min-height: 95vh;
    width: 100%;
    display: flex;
    padding: 40px 0px;
    box-sizing: border-box;
    justify-content: space-around;
`;