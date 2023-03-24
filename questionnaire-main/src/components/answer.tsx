import React, {useState} from "react";
import styled from "styled-components";
import { Box, Checkbox, FormControl, FormGroup, FormControlLabel,Slider, TextField} from "@mui/material";

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
// left: 40%;
`;

type QuestionProps = {
    title: string;
    optional: boolean;
    type: string;
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

    const handleClickYes = () => {
        setClickYes(!clickYes)
        if(clickNo){
            setClickNo(clickYes);
        } 
    }

    const handleClickNo = () => {
        setClickNo(!clickNo)
        if(clickYes){
            setClickYes(clickNo);
        } 
    }

    function valuetext(value: number) {
        return `${value}`;
      }
      
      function valueLabelFormat(value: number) {
        return marks.findIndex((mark) => mark.value === value);
      }

    const inputProps = {
        marginTop: "1rem",
        fontSize: 60
    }

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
                        <Slider
                            aria-label="Restricted values" defaultValue={0} valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valuetext} step={null} valueLabelDisplay="auto"
                            marks={marks} size = 'medium' max = {5}
                        />
                    </StyledBox>
                );
            
            case "sentence":
                return(
                    <TextFieldWrapper>
                        <TextField 
                        required = {curr.optional}
                        id="answer-field"
                        defaultValue=""
                        variant="filled"
                        size="medium"
                        margin="dense"
                        helperText="Please enter here"
                        fullWidth
                        inputProps={{ style: { fontSize: 23 } }}
                    /></TextFieldWrapper>
                );
        
                
    }

    return(
        <div><h3>error</h3></div>
        
    )
    
    
}

export default Answer;
