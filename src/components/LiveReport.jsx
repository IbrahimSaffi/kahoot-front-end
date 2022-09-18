import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice, { setCurrentQuestion, setCurrentQuestionTeacher, updateReport } from '../slices/apiSlice'
import { useNavigate } from "react-router-dom"

export default function LiveReport() {
    let dispatch = useDispatch(apiSlice)
    let state = useSelector(state => state.apiSlice)
    let goTo = useNavigate()
    let [btnDisability, setBtnDisability] = useState(true)
    useEffect(() => {
        console.log("here")
        state.socket.emit("start-update-quiz",{roomId:state.roomId,currQuestion:state.currTemplate.questions[state.currQuestionIndex]})
        setTimeout(() => {
            setBtnDisability(false)
        }, state.currTemplate.questions[state.currQuestionIndex].timer*1000)
        state.socket.on("answer-update",(data)=>{
            dispatch(updateReport(data))
        })
        setBtnDisability(true)
    }, [state.currQuestionIndex])
    return (
        <div className='live-report' >
            <img src="" alt="" />
            <p>{state.currTemplate.questions[state.currQuestionIndex].text}</p>
            <div className="row">
            {state.currTemplate.questions[state.currQuestionIndex].choices.map((answer,i)=>{
                return <button>
                    {state.answerCount.length>0?<p className='count' >{state.answerCount[i]}</p>:null}
                    {answer}</button>
            })}
            </div>
            {state.currQuestionIndex===state.currTemplate.questions.length-1?<button disabled={btnDisability} onClick={()=>goTo("/final-report")} >Conclude Quiz</button>:<button disabled={btnDisability} onClick={() => {
                dispatch(setCurrentQuestionTeacher())
            }} > Next Question</button>}
            

        </div>
    )
}
