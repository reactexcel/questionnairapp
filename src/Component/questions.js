import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { SaveInRequest } from '../Redux/action/action';
import Navbar from './navbar';
import axios from '../Services/index';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '5%',
    display: 'flex',
    margin: 'auto',
    width: '50%',
  },
  thankyou: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20%',
    color: '#1976d2',
  },
  radiogroups: {
    display: 'grid !important',
    '&.css-qfz70r-MuiFormGroup-root': {
      display: 'grid !important',
      gridTemplateColumns: '3fr 3fr 3fr 3fr 3fr !important',
    },
  },
  nextbtn: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
  },
}));
const Questions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [nexquestionDetails, setNextQuestionDetails] = useState();
  const [questionId, setQuestionid] = useState(1);
  const [optionsAns, setOptionsAns] = useState();
  const [selectedValue, setSelectedValue] = useState([]);
  const [thankyou, setThankYou] = useState(false);
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmdhbml6YXRpb25faWQiOjUzMiwicGFydG5lcl9jb2RlIjoiTmV3MDAwMSIsInN0YXRlIjoiQ2hoYXR0aXNnYXJoIiwiZXhwIjoxNjU4NDY5MjEzfQ.bVpA3SUwfWVnUuRFvJv3FtsQH7SaDpI_GJNu4VXhGtk';
  
  const nextQuestion = () => {
    getMyNextQuestions();
  };
  const storeAnswer = useSelector((state) => state);
  const prevQuestion = () => {
    if (questionId > 1) {
      setQuestionid((prev) => prev - 1);
    }
  };
  const getMyNextQuestions = async () => {
    let data;
    if (selectedValue) {
      data = {
        transaction_id: 'ZGVtbzIzc3NoIE5ldzAwMDEgNTMy',
        restart_eligibility: false,
        beneficiary_type: 0,
        answers: selectedValue,
      };
    } else {
      data = {
        transaction_id: 'ZGVtbzIzc3NoIE5ldzAwMDEgNTMy',
        restart_eligibility: false,
        beneficiary_type: 0,
        answers: [],
      };
    }
    try {
      const resp = await axios.post(`/run_dq`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp) {
        if (resp?.data?.status === 1009) {
          setThankYou(true);
        }
        setNextQuestionDetails(resp?.data?.next);
        let allOptions = [];
        for (let val in resp.data.next.options) {
          allOptions.push({
            [val]: resp.data.next.options[val],
          });
        }
        setOptionsAns(allOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMyNextQuestions();
  }, []);
  console.log(
    nexquestionDetails,
    'nexquestionDetailsnexquestionDetails',
    selectedValue, optionsAns
  );
  return (
    <>
      <Navbar />
      {thankyou ? (
        <div className={classes.thankyou}>
          <h1>Thank you!!</h1>
        </div>
      ) : (
        <>
          <div className={classes.root}>
            <div>
              <FormControl>
                <FormLabel id='demo-row-radio-buttons-group-label'>
                  <h3>{nexquestionDetails?.name}</h3>
                </FormLabel>
                {nexquestionDetails?.type == 'Coded' && (
                  <div className={classes.radiogroups}>
                    <RadioGroup
                      gridTemplateColumns
                      aria-labelledby='demo-row-radio-buttons-group-label'
                      defaultValue='female'
                      name='radio-buttons-group'
                    >
                      {optionsAns.length &&
                        optionsAns?.map((option) => (
                          <FormControlLabel
                            value={Object.values(option)[0]}
                            control={<Radio className={classes.radiogroups} />}
                            label={`${Object.values(option)[0]}`}
                            onChange={(e) =>
                              setSelectedValue((selectedValue) => [
                                {
                                  concept: nexquestionDetails?.name,
                                  value: Object.values(option)[0],
                                },
                              ])
                            }
                          />
                        ))}
                    </RadioGroup>
                  </div>
                )}
                {nexquestionDetails?.type == 'Numeric' && (
                  <TextField
                    type='number'
                    variant='outlined'
                    size='small'
                    required
                    sx={{ width: '100%' }}
                    onChange={(e) =>
                      setSelectedValue((selectedValue) => [
                        {
                          concept: nexquestionDetails?.name,
                          value: e.target.value,
                        },
                      ])
                    }
                  />
                )}
                {nexquestionDetails?.type == 'dataDriven' && (
                  <div>
                    <FormControl sx={{ width: 600 }} size='small'>
                      <Select
                      onChange={(e) =>
                        setSelectedValue((selectedValue) => [
                          {
                            concept: nexquestionDetails?.name,
                            value: e.target.value,
                          },
                        ])
                      }
                      >
                        {optionsAns.length && optionsAns.map((val)=>(
                           <MenuItem value={Object.values(val)[0]}>{Object.values(val)[0]}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
                {nexquestionDetails?.type == 'Text' && (
                  <TextField
                    type='text'
                    variant='outlined'
                    size='small'
                    required
                    sx={{ width: '100%' }}
                    onChange={(e) =>
                      setSelectedValue((selectedValue) => [
                        {
                          concept: nexquestionDetails?.name,
                          value: e.target.value,
                        },
                      ])
                    }
                  />
                )}
              </FormControl>
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
      )}
    </>
  );
};

export default Questions;
