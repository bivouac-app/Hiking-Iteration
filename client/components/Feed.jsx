import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';

const Feed = props => {
  const [statusInput, setStatusInput] = useState('');
  const [count, setCount] = useState(0);

  const {statusStack, setStatusStack} = props;

  useEffect(() => {
    setCount(statusInput.length);
  }, [statusInput])

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const clickSubmit = async () => {
    console.log('submit status: ', statusInput);
    if (statusInput.length === 0 || statusInput.length > 100) return;
    const user = JSON.parse(localStorage.getItem('user'));
    let postResponse = await axios.post('/api/posts/new', {content: statusInput, author_id: user._id});
    console.log(postResponse);
    getPosts();
  };

  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts/all");
      console.log("Response: ", response.data);
      
      const postArr = [];
      for (const post of response.data) {
        postArr.push(
        <Grid item xs={6}>
          <Card className="post-cards" sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  {post.created_on.slice(0,10)}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
          )
      }
      setStatusStack(postArr);
    }
    catch (error) {
      console.log('error in getPosts function');
    }
  };

  useEffect(() => {
    getPosts();
  }, []);


  return (
  <>
   <div id='add-status'> 
    <Box id="status-box" component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '50ch' },
        }} noValidate autoComplete="off">
        <div >
          <TextField label="Submit Status Here!" multiline width="50ch" minRows={2} maxRows={4}
            error={0 === count || count > 100}
            helperText={
              count === 0 ? 'Please enter a status' 
              : count > 100 ? `Status is too long, ${count}/100`
              : `${count}/100 Characters available`
            }
            value={statusInput} onChange={e => setStatusInput(e.target.value)}
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
    <Grid id="grid-container" container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {statusStack}
    </Grid>
  </>
  )
}

export default Feed;