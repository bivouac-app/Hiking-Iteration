import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import SignupScreen from "./screens/signupScreen";
import LoginScreen from "./screens/loginScreen";
import DashboardScreen from "./screens/dashboardScreen";
import NavBar from "./components/navBar";
import AddHikeScreen from "./screens/addHikeScreen";
import Feed from "./components/Feed";
import "./index.css";

const App = () => {

  const [user, setUser] = useState();
  const [statusStack, setStatusStack] = useState('');

  const getPosts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.post("/api/posts/get-hikes",
        {userid: user._id});
      setHikesData(response.data);
    }
    catch (error) {
      console.log('error in getPosts function');
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  
  // For (const post in posts) 
  // <Card sx={{ maxWidth: 345 }}>
  //     <CardActionArea>
  //       <CardMedia
  //         component="img"
  //         height="140"
  //         image="/static/images/cards/contemplative-reptile.jpg"
  //         alt="green iguana"
  //       />
  //       <CardContent>
  //         <Typography gutterBottom variant="h5" component="div">
  //           Lizard
  //         </Typography>
  //         <Typography variant="body2" color="text.secondary">
  //           Lizards are a widespread group of squamate reptiles, with over 6,000
  //           species, ranging across all continents except Antarctica
  //         </Typography>
  //       </CardContent>
  //     </CardActionArea>
  //   </Card>

  return (
    <div className="App">
      <div id="bg-L"></div>
      <div id="bg-R"></div>
      <Router>
      <NavBar />
      {/* <NavBar></NavBar> */}
        <Routes>
          <Route path='/Feed' element={<ProtectedRoute>< Feed statusStack={statusStack} setStatusStack={setStatusStack}/></ProtectedRoute>} />
          <Route path='/addhike' element={<ProtectedRoute>< AddHikeScreen /></ProtectedRoute>} />
          <Route path='/signup' element={< SignupScreen />} />  
          <Route path='/login' element={< LoginScreen />} />   
          {/* <Route path='/edithike' element={<EditHikeScreen/>} />              */}
                                  {/* ProtectedRoute(<DashboardScreen/>) */}
          <Route path='/' element={<ProtectedRoute>< DashboardScreen /></ProtectedRoute>} />            
        </Routes>    
      </Router>
    </div>
  );
}

export function ProtectedRoute(props){
  if (localStorage.getItem('user')){ 
    return props.children
  } else {
   return <Navigate to='/login'/>
  }
}

export default App;