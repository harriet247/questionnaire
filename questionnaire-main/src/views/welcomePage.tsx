import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import questionList from "../questoinList.json";


const WelcomePage = (props: any) => {
    const [goToQuestion, setGoToQuestion] = React.useState(false);

    const random5 = (array: any[]): string => {
        const maxDigit = array.length - 1;
        let randomNumber = '';

        const numDigits = Math.min(5, array.length);
      
        for (let i = 0; i < numDigits; i++) {
            let randomDigit;
            do {
              randomDigit = Math.floor(Math.random() * (maxDigit + 1));
            } while (randomNumber.includes(randomDigit.toString()));
            randomNumber += randomDigit.toString();
        }
      
        return randomNumber;
      }

    const navigate = useNavigate();
    if(goToQuestion){
        const id = random5(questionList);
        navigate('/question', {state: id})
    }

    return(
        <div className = "WelcomeWrapper">
            <h1 className = "Welcome"> Welcome to the health questionnaire!</h1>
            <Button variant="outline-primary" size="lg" onClick={()=>{
                setGoToQuestion(true);
            }}>
                Start</Button>
        </div>
    );
}

export default WelcomePage;