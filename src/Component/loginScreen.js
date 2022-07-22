import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router';
import MuiPhoneNumber from 'material-ui-phone-number';
import axios from '../Services/index';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '20%',
  },
  numberSec: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numbertext: {
    marginRight: '3px',
  },
  numberBtn: {
    marginLeft: '10px !important',
    paddingTop: '7px !important',
    paddingBottom: '8px !important',
    width: '110px !important',
  },
  validateotp: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  },
  continuebtn: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
  },
}));

const LoginScreen = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [submitNumber, setSubmitNumber] = useState(false);
  const [getNumber, setGetNumber] = useState('');
  const [checkValidate, setCheckValidate] = useState('');
  const [validate, setValidate] = useState(false);
  const handleGotOtp = () => {
    if (getNumber) {
      setSubmitNumber(true);
    } else {
      console.log('Enter a number');
    }
  };

  const handleValidate = () => {
    if (checkValidate.length > 4) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  };

  const handleContinue = () => {
    navigate('/details');
  };
  const handleGetNumber = (value) => {
    setGetNumber(value);
  };
  const handlegenarateToken = async () => {
    let data = {
      api_key: '9815847819effd09a7852f9b49fdec78',
      secret_key: 'df81e2740b420d0b669e55860fe9d5b4b76661c0',
      partner_code: 'MHHES001',
      state_code: 'MH',
    };
    const resp = await axios.post(`/generate_token`, data);
    localStorage.setItem('token', JSON.stringify(resp.data.token));
    getSchemeList();
  };

  const getSchemeList = async () => {
    const data = {
      requestData: {
        lang: 'en',
        serviceType: '',
      },
    };
    const resp = await axios.post(`/scheme/list`, data, {
      headers: {
        Authorization: "bearertoken " + getAcessToken(),
      },
    });
  };
  const getAcessToken = () => {
    const accessToken = JSON.parse(localStorage.getItem('token'));
    return accessToken;
  };

  useEffect(() => {
    // handlegenarateToken();
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.numberSec}>
        <MuiPhoneNumber
          defaultCountry={'in'}
          variant='outlined'
          size='small'
          onChange={handleGetNumber}
        />
        ,
        <Button
          variant='contained'
          className={classes.numberBtn}
          onClick={handleGotOtp}
          size='medium'
        >
          Send OTP
        </Button>
      </div>
      {submitNumber && (
        <>
          <div className={classes.validateotp}>
            <TextField
              variant='outlined'
              size='small'
              placeholder='Enter OTP'
              onChange={(e) => setCheckValidate(e.target.value)}
              required
              sx={{ width: '261px' }}
            />
            <Button
              variant='contained'
              className={classes.numberBtn}
              onClick={handleValidate}
              size='medium'
            >
              Validate
            </Button>
          </div>
          {validate && (
            <div className={classes.continuebtn}>
              <Button
                variant='contained'
                className={classes.numberBtn}
                onClick={handleContinue}
                size='medium'
              >
                Continue
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LoginScreen;
