import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
color: rgb(112 77 70);
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 1px solid #dbdbdb;
border-radius: 3px;
height: auto;
width : 45%;
text-align: left;
background-color: white;
`;
const Container = styled.div`
color: rgb(112 77 70);
font-size: 1em;

padding: 0.25em 1em;
border: 0.5px solid #e0d0d0;
border-radius: 3px;
text-align: left;
background-color: #fdfdfd;
`;


const CardWrap = styled.div`
display: flex;
flex-wrap: wrap;
`;

const CradHeader = styled.div`
font-size: 18px;
font-weight: bold;
`;

const Item = styled.div`
font-size: 14px;
width:50em;
padding-right:4px;
margin-bottom: 10px;
`;
const Header = styled.div`
text-align : center;  
padding: 0.25em 1em;
border: 0.5px solid #e0d0d0;
border-radius: 3px;
height: 100px;
background-color:  rgb(223 205 202);
color:  rgb(112 77 70);
`;

const CardContent = styled.div`
padding-top:5px;
display:flex;
`;

const ApiStarWars = () => {
    const [data, setData] = React.useState(null);
    const API_URL = 'https://swapi.dev/api/starships/';


    React.useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                data.results = data.results.filter(d => Number(d.crew.replace(/,/g, '')) <= 10);
                data.results.sort((a, b) => Number(b.crew) - Number(a.crew));
                setData(data)
            });
    }, []);

    return (
        <div >

            <Header><h1>Star Wars</h1></Header>
            <Container>
                <h2>StarShips</h2>
                {data ? (
                    <CardWrap>
                        {data?.results?.map((result) =>
                        (
                            <Card>
                                <CradHeader>{result.name}</CradHeader>
                                <CardContent>
                                    <Item>Model : {result.model}</Item>
                                    <Item>Number of Films : {result.films.length}</Item>
                                </CardContent>
                            </Card>
                        )
                        )
                        }

                    </CardWrap>
                ) : (
                    <h1>Loading...</h1>
                )}
            </Container>
        </div>

    );
};



export default ApiStarWars;