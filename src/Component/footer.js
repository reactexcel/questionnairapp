import React from 'react'
import { makeStyles  } from '@mui/styles'
const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: "#1976d2",
        height:200,
        marginTop:214,
        padding: "15px 20px",
        color:"white",
    },
  }));
const Footer = () => {
    const classes = useStyles();
  return (
    <div className={classes.root}>Footer
    
    
      {/* <div className={classes.root}>
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
      </div> */}
    
    
    </div>
  )
}

export default Footer