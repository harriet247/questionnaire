import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Alert, AlertTitle, Box, Checkbox, FormControl, FormGroup, FormControlLabel, Slider, TextField} from "@mui/material";

const StyledBox = styled(Box)`
position: absolute;
align-items: center;
boxShadow: 1;
border: none;
p: 2;
min-width: 40%;
height: 10%;
`;

const TextFieldWrapper = styled.div`
position: absolute;
align-item: center;
min-width: 30%;
`;

type QuestionProps ={
    title: string;
    optional: boolean;
    type: string;
    answer: any;
    getAnswer: (answer:any)=> void;
}

const marks = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

const Answer = (curr: QuestionProps) => {
    const [clickYes, setClickYes] = useState(false); 
    const [clickNo, setClickNo] = useState(false);
    const [answerText, setAnswerText] = useState(curr.answer?curr.answer:"");
    const [sliderVal, SetSliderVal] = useState(curr.answer?curr.answer:0);

    useEffect(() => {
        if(curr.type === "number"){
            SetSliderVal(curr.answer);
        } else if(curr.type === "sentence"){
            setAnswerText(curr.answer);
        }
    }, [curr.answer])

    const handleClickYes = () => {
        setClickYes(!clickYes);

        if (clickNo) {
            setClickNo(clickYes);
        } 
        if (!clickYes) {
            curr.getAnswer("Yes");
            return;
        }
        curr.getAnswer(" ");
    }

    const handleClickNo = () => {
        setClickNo(!clickNo);
        
        if (clickYes) {
            setClickYes(clickNo);
        } 
        if (!clickNo) {
            curr.getAnswer("No");
            return;
        }
        curr.getAnswer(" ");
    }


    const handleChecked = (selection: string) => {
        return selection === curr.answer;
    }

    const valuetext = (value: number) => {
        return `${value}`;
      }
      
    const valueLabelFormat = (index: number) => {
        return marks.findIndex((mark) => mark.value === index);
      }

    const handleSlider = (e: Event, newValue: number | number[]) => {
        if (newValue < 0 || newValue > 5) {
            return (
                <Alert severity="error" >
                        <AlertTitle>Slider value out of range</AlertTitle>
                </Alert>
                );
          } else {
            SetSliderVal(newValue as number);
            curr.getAnswer(newValue);
          }
    }

    try{
        switch(curr.type){
            case "yesno":
                return(
                    <FormControl required = {curr.optional} >
                    <FormGroup>
                      <FormControlLabel
                        control={<Checkbox checked={handleChecked("Yes")} onChange={handleClickYes} name="Yes" color="primary"/>}
                        label="Yes" 
                        />
                      <FormControlLabel
                        control={<Checkbox checked={handleChecked("No")} onChange={handleClickNo} name="No" color="primary" />}
                        label="No"/>
                    </FormGroup>
                  </FormControl>
                    );
            
            case "number":
                return(
                    <StyledBox>
                        <Slider id="slider"
                            aria-label="Restricted values" defaultValue={parseInt(curr.answer)?0:parseInt(curr.answer)} valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valuetext} step={null} valueLabelDisplay="auto"
                            marks={marks} size = 'medium' min = {0} max = {5} value = {sliderVal}
                            onChange={handleSlider}
                        />
                    </StyledBox>
                );
            
            case "sentence":
                return(
                    <TextFieldWrapper>
                        <TextField
                        required = {curr.optional}
                        id="answer-field"
                        defaultValue = {curr.answer}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const inputValue = e.target.value;
                            setAnswerText(inputValue);
                            curr.getAnswer(inputValue);
                          }}
                        variant="filled"
                        size="medium"
                        margin="dense"
                        helperText="Please enter here"
                        fullWidth
                        inputProps={{ style: { fontSize: 23 } }}
                    /></TextFieldWrapper>
                );
        
                
        }
    } catch(err){
        return(
        <Alert severity="error" >
            <AlertTitle>Error</AlertTitle>
        </Alert>)
    }
       

    return(
        <Alert severity="error" >
            <AlertTitle>Answer component failed</AlertTitle>
        </Alert>
        
    )
    
    
}

export default Answer;
