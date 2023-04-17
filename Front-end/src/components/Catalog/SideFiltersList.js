import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NiceCheckbox from '../../constants/NiceCheckbox';
import selectFilter from './selectFilterFunction';

export default function SideFiltersComponents ({ categoryIds, setCategoryIds, colorIds, setColorIds, brandIds, setBrandIds, setStatus }) {
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getFilters() {
            try {
                const brandsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/brands`);
                const colorsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/colors`);
                const categoriesResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/categories`);

                setBrands(brandsResponse.data);
                setColors(colorsResponse.data);
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.log(error);
            }
        }

        getFilters();
    }, []);
    
    return (
        <Container>
            <h1>Filtros</h1>

            <div>
                <h2>Marcas</h2>
                <FilterList>
                    {
                    brands.map((x, idx) => 
                        { return (
                            <li key={idx}>
                                <NiceCheckbox idx={x.name} onClickF={selectFilter} filterArray={brandIds} setFilterArray={setBrandIds} id={x.id} setStatus={setStatus}/>
                                <label htmlFor={`${x.name}`}>{x.name}</label>
                            </li>
                        )}
                    )}
                </FilterList>
            </div>

            <div>
                <h2>Categorias</h2>
                <FilterList>
                    {
                    categories.map((x, idx) => 
                        { return (
                            <li key={idx}>
                                <NiceCheckbox idx={x.name} onClickF={selectFilter} filterArray={categoryIds} setFilterArray={setCategoryIds} id={x.id} setStatus={setStatus}/>
                                <label htmlFor={`${x.name}`}>{x.name}</label>
                            </li>
                        )}
                    )}
                </FilterList>
            </div>

            <div>
                <h2>Cores</h2>
                <FilterList>
                    {
                    colors.map((x, idx) => 
                        { return (
                            <li key={idx}>
                                <NiceCheckbox idx={x.name} onClickF={selectFilter} filterArray={colorIds} setFilterArray={setColorIds} id={x.id} setStatus={setStatus}/>
                                <label htmlFor={`${x.name}`}>{x.name}</label>
                            </li>
                        )}
                    )}
                </FilterList>
            </div>
        </Container>
    )
}

//Styled Components
const Container = styled.div`
    width: 14%;
    height: 100%;
    gap: 30px;
    display: flex;
    flex-direction: column;
    border-right: 2px solid #006A71;
    box-sizing: border-box;
    padding-bottom: 20px;

    h2 {
        font-size: 30px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        color: #006A71;
        margin-bottom: 10px;
    }

    h1 {
        font-size: 40px;
        font-family: 'Quicksand', sans-serif;
        font-weight: 600;
        color: #006A71;
        margin-top: 30px;
        margin-bottom: 15px;
    }
`
const FilterList = styled.ul`
    padding-left: 15px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    li {
        display: flex;
        align-items: center;
        padding: 5px;
        gap: 5px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 17px;

        label {
            cursor: pointer;
        }
    }

    svg {
        color: green;
    }

    input {
        :checked {
            border: 2px solid green;
        }
    }
`