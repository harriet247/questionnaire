import React from 'react';
import { ProgressBar, Button, Nav, NavItem, Navbar } from 'react-bootstrap';
import styled from "styled-components";
import questionList from "../questoinList.json";

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

const QuestionWrapper = styled.div`
display: flex;
text-align: center;
min-height: 1000px;
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

const StyleProgressBar = styled(ProgressBar)`
margin:0 auto;
min-height:30px;
`;

function RandomQuestion(qList:{title:string,optional:string,type:string}[]){
    var n = qList.length;
    var result = new Array(n),
    len = qList.length,
    taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = qList[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result.slice(0,5);
}

function QuestionPage(props: any) {
    return(
        <Backgroud>
                <Stylednav variant="pills" defaultActiveKey="/">
                    <StyledNavItem >
                        <Nav.Link href="/">Home</Nav.Link>
                    </StyledNavItem >
                    <StyledNavItem >
                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                    </StyledNavItem >
                </Stylednav>
                <StyleProgressBar now={60} animated={true}/>
            <QuestionWrapper>
                <h1 className="question">Q</h1>
                
            </QuestionWrapper>
        </Backgroud>
    )
}

export default QuestionPage;