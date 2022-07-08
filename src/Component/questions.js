import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { SaveInRequest } from '../Redux/action/action';

const questionsDetails = [
  {
    id: 1,
    ques: 'This is my first question?',
    type: 'radio',
    options: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
  },
  {
    id: 2,
    ques: 'This is my second question?',
    type: 'radio',
    options: ['12333', '88888', '9999', '10100101', '0000000'],
  },
  {
    id: 3,
    ques: 'This is my second question?',
    type: 'checkbox',
    options: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
  },
  {
    id: 4,
    ques: 'This is my fourth question?',
    type: 'text',
    options: null,
  },
 
];

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
  },
  answers: {},
  nextbtn: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
  },
}));
const Questions = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState({
    id:"",
    ans:[],
  });
  const [globalState, setGlobalState]= useState([])
  const [selectCheckBox, setSelectCheckBox]= useState([]);
  const [questionId, setQuestionid] = useState(1);
  const [textAnswer, setTextAnswer] = useState("")

  const nextQuestion = () => {
    if (questionsDetails.length > questionId) {
      setQuestionid((prev) => prev + 1);
      dispatch(SaveInRequest({globalState}))
    }
  };
  const storeAnswer = useSelector((state)=> state)
  const prevQuestion= ()=>{
    if(questionId>1){
        setQuestionid((prev) => prev - 1)
    }
  }
const handleSaveAnswer=(e,type,quesID)=>{
  if(type==='radio'){
    let prev={
      ...selectedValue, id:quesID, ans:[e.target.value]
    }
    setSelectedValue(prev)
    setGlobalState([...globalState, prev])
  } 
  // else if (type==="text"){
  //   let prev={
  //     ...selectedValue,id:quesID,ans:[e.target.value]
  //   }
  //   setSelectedValue(prev)
  //   setGlobalState([...globalState, prev])
  // }
}
  return (
    <>
      <div className={classes.root}>
        <div>
          {questionsDetails
            .filter((value) => value.id === questionId)
            .map((val) => (
              <FormControl>
                <FormLabel id='demo-radio-buttons-group-label'>
                  <h3>{val.ques}</h3>
                </FormLabel>
                {val.type === 'radio' && (
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='female'
                    name='radio-buttons-group'
                  >
                    {val?.options?.map((option, ind) => (
                      <FormControlLabel
                        value={option}
                        control={<Radio />}
                        label={`${option}`}
                        onChange={(e)=>handleSaveAnswer(e, "radio",val.id)}
                        // onChange={(e) => setSelectedValue(e.target.value)}
                      />
                    ))}
                  </RadioGroup>
                )}
                {val.type === 'checkbox' && (
                   <FormGroup>
                    {val.options.map((option)=>(
                        <FormControlLabel 
                        // value={option}
                        control={<Checkbox />} 
                        label={`${option}`} 
                        onChange={(e)=>handleCheck(e)}
                        />
                    ))}
                 </FormGroup>
                )}
                {val.type==="text" && (
                  <TextField fullWidth label="Enter your answer" id="fullWidth" size="small" onChange={(e)=>handleSaveAnswer(e,"text",val.id)}/>
                )}
              </FormControl>
            ))}
        </div>
      </div>
      <div className={classes.nextbtn}>
       <div> 
      <Button
          variant='contained'
          disableElevation
          onClick={() => prevQuestion()}
        >
          Previous
        </Button>
        </div>
        <div>
        <Button
          variant='contained'
          disableElevation
          onClick={() => nextQuestion()}
        >
          Save and Next
        </Button>
        </div>
      </div>
    </>
  );
};

export default Questions;
