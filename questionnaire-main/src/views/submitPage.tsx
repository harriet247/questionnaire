import React, { useState} from "react";
import {useLocation} from "react-router-dom";
import { Button, Nav } from 'react-bootstrap';
import styled from "styled-components";

const Backgroud = styled.div`
text-align: center;
width: 1800px;
margin: 0 auto;
@media (max-width: 875px) {
  width: 418px;
}
@media (max-width: 576px) {
  width: 100%;
}
`;

const Stylednav = styled(Nav)`
list-style-type: none;
margin: 0;
padding: 0;
overflow: hidden;
background-color: #D3D3D3;
`;

const StyledNavItem = styled(Nav.Item)`
dislay: flex;
margin:10;
align-items: center;
justify-content: center;
padding: 1rem 0.5rem;
`;

const ResultWrapper = styled.div`
position: relative;
display: flex;
flex-direction: column;
text-align: center;
background-color: #f8f9fa;
width: 1800px;
margin: 0 auto;
@media (max-width: 875px) {
  width: 418px;
}
@media (max-width: 576px) {
  width: 100%;
}
`;

const ResultBlock = styled.div`
position: relative;
display: flex;
flex-direction: column;
text-align: center;
margin-top: 5rem;
margin-bottom: 5rem;
`;

const ButtonWrapper = styled.div`
position: relative;
display: block;
max-height: 8rem;
min-width: 100%;
align-items: center;
justify-content: center;
background-color: #D3D3D3;
text-align: center;
`;


type ResultProps ={
    title: string;
    answer: any;
}

const SubmitPage = (props: any) => {

    const location = useLocation();
    const data: ResultProps[] = location.state;

    const handleClick = () => {
        alert("submit successfully");
    }
    return(
        <Backgroud>
                <Stylednav variant="pills" defaultActiveKey="/">
                <StyledNavItem >
                        <Nav.Link href="/">Home</Nav.Link>
                    </StyledNavItem >
                </Stylednav>
                <ResultWrapper>
                {data.map((d: ResultProps) => (
                    <ResultBlock key={d.title}>
                    <h3>{d.title}</h3>
                    <p>{d.answer}</p>
                    </ResultBlock>
                ))}
                </ResultWrapper>
                <ButtonWrapper>
                    <Button onClick={handleClick}>Submit</Button>
                </ButtonWrapper>
        </Backgroud>
    );
}

export default SubmitPage;