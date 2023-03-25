import React, {useState} from "react";
import styled from "styled-components";

import Answer from "./answer";

type QuestionProps = {
    title: string;
    optional: boolean;
    type: string;
    answer: any;
    getAnswer: (answer:any)=> void;
}

const QuestionWrapper = styled.div`
position: absolute;
width: 1750px;
height: 1000px;
max-height: 100%;
max-width: 100%;
margin: 0 auto;
align-item: center;
padding: 15px;
display: flex;
flex-direction: column; 
top: 10rem;

`;

const AnswerWrapper = styled.div`
position: relative;
width: 1750px;
height: 800px;
max-width: 100%;
margin: 0 auto;
align-item: center;
justify-content: center;
display: flex;
justify-content: space-around;
top: 6rem;
`;

const Question = (props: QuestionProps) => {

    
    return(
        <QuestionWrapper>
            <div className="titleDiv" >
            <h2>{props.title}</h2>
            </div>
            <AnswerWrapper>
            <Answer title={props.title} optional={props.optional} type={props.type} answer={props.answer} getAnswer={props.getAnswer}/>
            </AnswerWrapper>
        </QuestionWrapper>
        
    )
}

export default Question;
