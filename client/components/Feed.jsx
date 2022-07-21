import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';

const Feed = props => {
  const [statusInput, setStatusInput] = useState('');
  const [count, setCount] = useState(0);

  const {statusStack, setStatusStack} = props;

  useEffect(() => {
    setCount(statusInput.length);
  }, [statusInput])

  const clickSubmit = () => {
    console.log('submit status: ', statusInput);
    if (statusInput.length === 0 || statusInput.length > 100) return;
  };

  const getFeed = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(
        "/api/posts",
        {
          userid: user._id
        }
      );
      setHikesData(response.data);
    }
    catch (error){
      console.log('error in getFeed function')
    }
  }

  return (
  <>
   <div id='add-status'> 
    <Box
        id="status-box"
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div >
          <TextField
            
            label="Submit Status Here!"
            multiline
            width="50ch"
            minRows={2}
            maxRows={4}
            error={0 === count || count > 100}
            helperText={
              count === 0 ? 'Please enter a status' 
              : count > 100 ? `Status is too long, ${count}/100`
              : `${count}/100 Characters available`
            }
            value={statusInput}
            onChange={e => setStatusInput(e.target.value)}
          />
        </div>
      </Box>
      <div id='submit-container'>
        <Button id="submit-status-btn" variant="contained" onClick={clickSubmit}>Submit Status!</Button>
        <Fab id="photo-btn" color="primary" variant="extended">
          <input type="file" />
        </Fab> 
      </div>
    </div> 
    <Stack>
      {statusStack}
    </Stack>
  </>
  )
}

export default Feed;