import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { Alert, ProgressBar, Button, Nav } from 'react-bootstrap';
import styled from "styled-components";
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
// get the first 5 questions from a random list of questions

// const currentList = RandomQuestion(questionList);

const QuestionPage = (props: any) => {
    const { id } = useParams();

    const [currentList, setCurrentList] =  useState<any[]>([{
        "title": "",
        "optional": false,
        "type": "sentence"
    }]);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [goNext, setGoNext] = useState(false);

    const questionList = props;
    const randomIndices = id!.toString().split('').map(Number);
    
    useEffect(()=>{
        const templist = questionList["props"];
        setCurrentList(randomIndices.map(index => templist[index]));
    },[])

    const handleNextClick = () => {
		const nextQuestion = currentQuestion + 1;
        console.log(nextQuestion)

		if (nextQuestion < currentList.length) {
			setCurrentQuestion(nextQuestion);
            setCurrentProgress(currentProgress + 10);
		} else {
			// show end page
		}
	};

    const handleBackClick = () => {
        const prevQuestion = currentQuestion - 1;
        if(prevQuestion > -1) {
            setCurrentQuestion(prevQuestion);
            setCurrentProgress(currentProgress - 10);
            setGoNext(false);
        }
    }

    // generate an alert if id is null or undefined
    if (id === null || id === undefined) {
        return (
          <Alert variant="danger">
            The questions are not ready.
          </Alert>
        );
      }

    const getAnswer = (answer: any) => {
       if(currentList[currentProgress].optional) {
           setGoNext(true);
       } else if(!currentList[currentProgress].optional) {
            if(answer){
                setGoNext(true);
            }
       }
    }
      
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
                <Question title={currentList[currentProgress].title} optional ={currentList[currentProgress].optional} type={currentList[currentProgress].type} getAnswer={getAnswer}/>
                <ButtonWrapper>
                    <StyledButton className = "back" onClick={handleBackClick}>BACK</StyledButton>
                    <StyledButton className = "next" onClick={handleNextClick}>NEXT</StyledButton>
                </ButtonWrapper>
            </QuestionWrapper>
        </Backgroud>
    )
}

export default QuestionPage;