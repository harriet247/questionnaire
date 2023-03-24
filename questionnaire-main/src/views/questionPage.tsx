import React, {useEffect, useState} from 'react';
import { ProgressBar, Button, Nav, NavItem, Navbar } from 'react-bootstrap';
import styled from "styled-components";
import questionList from "../questoinList.json";
import Question from "../components/question";

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

const ButtonWrapper = styled.div`
margin-top:50rem;
display: block;
max-height: 5rem;
min-width: 100%;
align-items: center;
justify-content: center;
background-color: #D3D3D3;
text-align: center;
`;

const StyledButton = styled(Button)`
width:120px;
height:50px;
padding: 10px 24px;
display: inline-block;
border: none;
text-decoration: none;
background-color: #4CAF50;
margin-top:0.5rem;
margin-left: 18rem;
margin-right:18rem;
min-height: 80%;
align-items: center;
justify-content: center;
`;

const QuestionPage = (props: any) => {
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleAnswerOptionClick = () => {
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < currentList.length) {
			setCurrentQuestion(nextQuestion);
            setCurrentProgress(currentProgress + 10);
		} else {
			// show end page
		}
	};

    const handleGoBackClick = () => {
        const prevQuestion = currentQuestion - 1;
        if(prevQuestion > -1) {
            setCurrentQuestion(prevQuestion);
            setCurrentProgress(currentProgress - 10);
        }
    }

    // get the first 5 questions from a random list of questions
    const RandomQuestion = (qList:{title:string,optional:boolean,type:string}[]) => {
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

    const currentList = RandomQuestion(questionList);
    
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
                <StyleProgressBar now={currentProgress} animated={true}/>
            <QuestionWrapper>

                <Question title={currentProgress.title} optional ={currentProgress.optional} type={currentProgress.type}/>
                <ButtonWrapper>
                    <StyledButton className = "back">BACK</StyledButton>
                    <StyledButton className = "next">NEXT</StyledButton>
                </ButtonWrapper>
            </QuestionWrapper>
        </Backgroud>
    )
}

export default QuestionPage;