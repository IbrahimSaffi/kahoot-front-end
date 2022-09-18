import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice from '../slices/apiSlice'

export default function FinalReport() {
  let dispatch = useDispatch(apiSlice)
  let state = useSelector(state => state.apiSlice)
  let [report, setReport] = useState({})
  useEffect(() => {
    //Generating final report
    let finalReport = {}
    console.log(state.quizReport)
    Object.keys(state.quizReport).forEach(student => {
      let tempArr = []
      Object.keys(state.quizReport[student]).forEach(question=>{
        console.log(state.currTemplate.questions[question].correct_answer,state.currTemplate.questions[question].choices[state.quizReport[student][question]])
        if(
          state.currTemplate.questions[question].correct_answer==state.currTemplate.questions[question].choices[state.quizReport[student][question]]
        ){
          tempArr.push(true)
        }
        else{
          tempArr.push(false)
        }
      })
      finalReport[student] = tempArr
    })
    console.log(finalReport)
  }, [])
  return (
    <div>FinalReoprt</div>
  )
}
