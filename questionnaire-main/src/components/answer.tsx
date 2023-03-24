import React, {useState} from "react";
import styled from "styled-components";
import { Alert,AlertTitle, Box, Checkbox, FormControl, FormGroup, FormControlLabel,Slider, TextField} from "@mui/material";
import { propTypes } from "react-bootstrap/esm/Image";

const StyledBox = styled(Box)`
position: absolute;
align-item: center;
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
    getAnswer: (answer:any)=> void;
}

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4'
    },
    {
        value: 5,
        label: '5'
    }
];

const Answer = (curr: QuestionProps) => {
    const [clickYes, setClickYes] = useState(false); 
    const [clickNo, setClickNo] = useState(false);
    const [answerText, setAnswerText] = useState("");
    const [sliderVal, SetSliderVal] = useState(0);

    const handleClickYes = () => {
        setClickYes(!clickYes)
        if(clickNo){
            setClickNo(clickYes);
        } 
        if(!clickYes){
            curr.getAnswer("Yes");
        }
    }

    const handleClickNo = () => {
        setClickNo(!clickNo)
        if(clickYes){
            setClickYes(clickNo);
        } 
        if(!clickNo){
            curr.getAnswer("No");
        }
    }

    const valuetext = (value: number) => {
        return `${value}`;
      }
      
    const valueLabelFormat = (value: number) => {
        return marks.findIndex((mark) => mark.value === value);
      }

    const handleSlider = (event: Event, newValue: number | number[]) => {
        if (newValue < 0 || newValue > 5) {
            console.error('Invalid slider value:', newValue);
            // set an error state or show an error message to the user
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
                        control={<Checkbox checked={clickYes} onChange={handleClickYes} name="Yes" color="primary"/>}
                        label="Yes" />
                      <FormControlLabel
                        control={<Checkbox checked={clickNo} onChange={handleClickNo} name="No" color="primary" />}
                        label="No"/>
                    </FormGroup>
                  </FormControl>
                    );
            
            case "number":
                return(
                    <StyledBox>
                        <Slider id="slider"
                            aria-label="Restricted values" defaultValue={0} valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valuetext} step={null} valueLabelDisplay="auto"
                            marks={marks} size = 'medium' max = {5}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setAnswerText(e.target.value);
                            curr.getAnswer(answerText);
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
            Something went wrong!
        </Alert>)
    }
       

    return(
        <div><h3>error</h3></div>
        
    )
    
    
}

export default Answer;
