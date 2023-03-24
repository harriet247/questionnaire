import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import questionList from "../questoinList.json";


const WelcomePage = (props: any) => {
    const [goToQuestion, setGoToQuestion] = React.useState(false);

    const random5 = (array: any[]): number => {
        const maxDigit = array.length - 1;
        let randomNumber = '';
      
        for (let i = 0; i < 5; i++) {
          const randomDigit = Math.floor(Math.random() * (maxDigit + 1));
          randomNumber += randomDigit.toString();
        }
      
        return parseInt(randomNumber);
      }

    if(goToQuestion){
        const id = random5(questionList);
        console.log(id);
        return <Navigate to={`/question/${id}`} />;
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