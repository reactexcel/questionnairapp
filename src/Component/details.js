import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {  useNavigate } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const useStyles = makeStyles(() => ({
  root: {
    marginTop: '18%',
  },
  main: {
   width:"40%",
   margin:"auto",
  },
  customerdetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  startscreenbtn: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const DetailsFill = () => {
  const classes = useStyles();
  const navigate= useNavigate()
  const [customerName, setCustomerName] = useState("")
  const [dob, setDob]= useState('')
  const [gender, setGender] = useState("")
  const handleScreeningStart=()=>{

    navigate("/questions")
  }
  const handleSelectGender=(e)=>{
    setGender(e.target.value)
  }

  return (
    <div className={classes.root}>
       <div className={classes.main}> 
      <div className={classes.customerdetails}>
        <div>Customer Name</div>
        <div>
          <TextField fullWidth id='fullWidth' size='small' sx={{width: 200}} onChange={(e)=>setCustomerName(e.target.value)} required="true"/>
        </div>
      </div>
      <div className={classes.customerdetails}>
        <div>DOB</div>
        <div>
          <TextField fullWidth id='fullWidth' size='small' type='date' sx={{width: 200}} onChange={(e)=>setDob(e.target.value)}/>
        </div>
      </div>
      <div className={classes.customerdetails}>
        <div>Gender</div>
        <div>
        <FormControl sx={{ width: 200 }} size="small">
      <Select
        value={gender}
        onChange={(e)=>handleSelectGender(e)}
      >
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="others">Others</MenuItem>
      </Select>
    </FormControl>
        </div>
      </div>
      <div className={classes.startscreenbtn}>
        <Button variant='contained' size='medium' onClick={handleScreeningStart}>
          Start Screening
        </Button>
      </div>
      </div>
    </div>
  );
};

export default DetailsFill;
