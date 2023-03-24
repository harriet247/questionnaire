import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import './App.css';

import WelcomePage from './views/welcomePage';
import QuestionPage from './views/questionPage';
import questionList from "./questoinList.json";


const Backgroud = styled.div`
text-align: center;
width: 1800px;
margin: 0 auto;
background: inherit;
@media (max-width: 875px) {
  width: 418px;
}
@media (max-width: 576px) {
  width: 100%;
}
`;

function App() {

  return (
    <div className="App">
      <Backgroud>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />}/>
          <Route path="/question/:id" element={<QuestionPage props={questionList} />}/>
        </Routes>
      </Router>
      </Backgroud>
    </div>
    
  );
}

export default App;
