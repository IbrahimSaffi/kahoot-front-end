import './App.css';
import {  Routes, Route,useNavigate, useParams } from "react-router-dom"
import StartPage from './components/StartPage';
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import JoinQuizPage from './components/JoinQuizPage';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import apiSlice, { setError } from './slices/apiSlice';
import QuizRoom from './components/QuizRoom';
import QuizPage from './components/QuizPage';
import LiveReport from './components/LiveReport';
import FinalReport from './components/FinalReport';
import Header from './components/Header';
import Profile from './components/Profile';
import Report from './components/Report';
import Templates from './components/Templates';
import CreateTemplate from './components/CreateTemplate';

function App() {
 let dispatch = useDispatch(apiSlice)
 let state = useSelector(state=>state.apiSlice)
 let goTo = useNavigate()
 let id = useParams().id //To check if it is student joining ther room
 let [errPos,setPos] = useState("-40px") 
 useEffect(()=>{
     setPos("40px")
     setTimeout(()=>{
       setPos("-40px")
      setTimeout(()=>{
        dispatch(setError(""))
       },6000)
    },3000)
 },[state.error])
  // useEffect(()=>{
  //   if(state.profile&&!id){
  //     goTo("/teacher/templates")
  //   }
  // },[state.profile])
  return (
    <div className="app">
       {/* //I am teacher or I am student page if not logged in localstorage record */}
       <Header/>
       <p className='error' style={{top:errPos}} >{state.error}</p>
       <Routes>
        <Route path='/' element={<StartPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/teacher' element={<Profile/>} >
          <Route path='reports' element={<Report/>} />
          <Route path='templates' element={<Templates/>} /> 
          </Route>
          <Route path='/create-template' element={<CreateTemplate/>} />
          <Route path = '/quiz-room' element={<QuizRoom/>}/> 
          <Route path = '/live-report' element={<LiveReport/>}/>
          <Route path='/final-report' element={<FinalReport/>} />
          <Route path="/join-quiz" element={<JoinQuizPage/>}/>
          <Route path="/join-quiz/:id" element={<JoinQuizPage/>}/>
         <Route path ="/quiz" element={<QuizPage/>} />         
          
      </Routes>
    </div>
  );
}

export default App;
