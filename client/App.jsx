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
  
  // For (const post in posts) 

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