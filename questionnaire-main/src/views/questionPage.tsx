import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation} from "react-router-dom";
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
position: relative;
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
    const location = useLocation();
    const id: number = location.state;

    // generate an alert if id is null or undefined
    if (id === null || id === undefined) {
        return (
        <Alert variant="danger">
            The questions are not ready.
        </Alert>
        );
    }

    const [currentList, setCurrentList] =  useState<any[]>([{
        "title": "",
        "optional": false,
        "type": "sentence"
    }]);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [goNext, setGoNext] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [goToSubmit, setGoToSubmit] = useState(false);

    const questionList = props;
    const randomIndices = id!.toString().split('').map(Number);
    
    useEffect(()=>{
        const templist = questionList["props"];
        const currList = randomIndices.map(index => templist[index]);
        setCurrentList(currList.map(obj => ({ ...obj, answer: "" })));
    },[]);


    useEffect(() => {
        const nextQuestion = currentQuestion + 1;
        if (goNext) {
          if (nextQuestion < currentList.length) {
            setCurrentQuestion(nextQuestion);
            setCurrentProgress(currentProgress +  100 / currentList.length);
            setGoNext(false); 
          }else if(nextQuestion === currentList.length){
            setGoToSubmit(true);
          }
        }
      }, [goNext, currentQuestion, currentList.length, currentProgress]);

    const handleNextClick = () => {
        if(currentList[currentQuestion].optional) {
            setGoNext(true);
        } else {
            const answer = currentList[currentQuestion].answer;
            if (typeof answer === "number" && answer >= 0) {
              setGoNext(true);
            } else if(typeof answer === "string" && answer.trim()){
              setGoNext(true);
            }else {
              setGoNext(false);
            }
          }
	};

    const handleBackClick = () => {
        const prevQuestion = currentQuestion - 1;
        if(prevQuestion > -1) {
            setCurrentQuestion(prevQuestion);
            setCurrentProgress(currentProgress - (100/currentList.length));
        }
    };
  
    const getAnswer = (answer: any) => {
        if(answer !== ""){
          setCurrentAnswer(answer);
          currentList[currentQuestion].answer = answer;
        }
    };

    const getTitleAndAnswerArray = (questions: any[]): { title: string, answer: any }[] => {
        return questions.map(({ title, answer }) => ({ title, answer }));  
    };


    const navigate = useNavigate();
    if(goToSubmit){
        const data = getTitleAndAnswerArray(currentList);
        navigate('/submit', {state: data});
    };
      
    return(
        <Backgroud>
                <Stylednav variant="pills" defaultActiveKey="/">
                    <StyledNavItem >
                        <Nav.Link href="/">Home</Nav.Link>
                    </StyledNavItem >
                </Stylednav>
                <StyleProgressBar now={currentProgress} animated={true}/>
            <QuestionWrapper>
                <Question title={currentList[currentQuestion].title} optional ={currentList[currentQuestion].optional} type={currentList[currentQuestion].type} answer={currentList[currentQuestion].answer} getAnswer={getAnswer}/>
                <ButtonWrapper>
                    <StyledButton className = "back" onClick={()=>handleBackClick()}>BACK</StyledButton>
                    <StyledButton className = "next" onClick={()=>handleNextClick()}>NEXT</StyledButton>
                </ButtonWrapper>
            </QuestionWrapper>
        </Backgroud>
    )
}

export default QuestionPage;