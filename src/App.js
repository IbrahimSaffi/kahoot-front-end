import './App.css';
import {  Routes, Route,useNavigate } from "react-router-dom"
import StartPage from './components/StartPage';
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import JoinQuizPage from './components/JoinQuizPage';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import apiSlice from './slices/apiSlice';
import QuizRoom from './components/QuizRoom';

function App() {
 let dispatch = useDispatch(apiSlice)
 let state = useSelector(state=>state.apiSlice)
 let goTo = useNavigate()
  // useEffect(()=>{
  //   if(state.profile){
  //     goTo("/teacher/templates")
  //   }
  // },[state.profile])
  return (
    <div className="App">
       {/* //I am teacher or I am student page if not logged in localstorage record */}
       <Routes>
        <Route path='/' element={<StartPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignupPage/>} />
          <Route path='/teacher' >
          <Route path='reports' />
          <Route path='templates' /> 
          </Route>

          {/* //On each template there is option to start quiz */}
          {/* //When template page is opened get all templates */}
          {/* //Save option and Add question option */}
          {/* //When save question is clicked send quiz to backend and store quiz in quizes array */}
          {/* //Every time add question is clicked send that question to backend and save id in array */}
          <Route path='/create-template'/>
           {/* //Add qustion/delete question/save template/save and start option */}
          <Route path = '/quiz-room' element={<QuizRoom/>}/> 
          {/* All socket stuff starts here/generate QR code and pin code/section showing joined people/start quiz button */}
          <Route path = '/live-report'/>
           {/* Waiting for students to answer /alert for every student answer/ and correct and wrong answer reports/ranks of each answer// after timer finishes click next question option// when clicked render next question from array//maintan curr question state/after whole array is traveresed go to final report page */}
          <Route path='/final-report'/>
           {/* Ranks/Go to templates (if clicked go to templates student will be displayed their result and feedback option)
           send request to backend for final report/generate report 
          //For student */}
          <Route path="/join-quiz" element={<JoinQuizPage/>}/>
          {/* //Will ask pin code and name and then will go to quiz page */}
          <Route path="/join-quiz/:id" element={<JoinQuizPage/>}/>
          {/* same page as above but pin code section will be disabled/ */}

         <Route path ="/quiz"/>
          {/* timer and stuff */}
         
          
      </Routes>
    </div>
  );
}

export default App;
