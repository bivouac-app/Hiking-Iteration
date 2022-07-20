import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import GoogleOauth from '../components/Authenticate';
import VideoPlayer from 'react-background-video-player';

const LoginScreen = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        '/api/users/login',
        { email, password },
        {
          proxy: {
            host: 'localhost',
            port: 3000,
          },
        },
      );

      //Make a post request to /api/users/login
      //body includes email, password
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  //to check if user is already logged in, navigate to homepage

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, []);

  return (
    <div className='signupScreen-container'>
      {/* <VideoPlayer
        className="video"
        src={
          "https://player.vimeo.com/external/435674703.sd.mp4?s=01ad1ba21dc72c1d34728e1b77983805b34daad7&profile_id=165&oauth2_token_id=57447761"
        }
        autoPlay={true}
        muted={true}
      /> */}
      <h1>Login</h1>
      <input
        className='loginInputs'
        type='email'
        id='loginEmail'
        name='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className='loginInputs'
        type='password'
        id='loginPassword'
        name='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br></br>
      <Link to="/signup">Not registered yet? Click here to register!</Link>
      <button className="signupButton" id='signup-submit'onClick={() => handleSubmit()} >Login</button>
      {/* <GoogleOauth /> */}
      <a href="/api/auth/google">Log in With oAuth</a>
      {success && <p>Success, redirecting... login with your credentials</p>}
    </div>
  );
};

export default LoginScreen;
