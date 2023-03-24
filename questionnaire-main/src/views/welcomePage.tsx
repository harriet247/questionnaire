import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from "react-router-dom";

const WelcomePage = (props: any) => {
    const [goToQuestion, setGoToQuestion] = React.useState(false);

    if(goToQuestion){
        return <Navigate to="/question" />;
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