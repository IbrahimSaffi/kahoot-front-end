import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice, { setCurrentQuestion, setCurrentQuestionTeacher, updateReport } from '../slices/apiSlice'

export default function LiveReport() {
    let dispatch = useDispatch(apiSlice)
    let state = useSelector(state => state.apiSlice)
    let [btnDisability, setBtnDisability] = useState(true)
    useEffect(() => {
        state.socket.emit("start-update-quiz",{roomId:state.roomId,currQuestion:state.currTemplate.questions[state.currQuestionIndex]})
        console.log(state.currQuestionIndex)
        setTimeout(() => {
            console.log("here")
            setBtnDisability(false)
        }, state.currTemplate.questions[state.currQuestionIndex].timer*1000)
        state.socket.on("answer-update",(data)=>{
            console.log(data)
            dispatch(updateReport(data))
        })
        setBtnDisability(true)
    }, [state.currQuestionIndex])
    return (
        <div>LiveReport
            <button disabled={btnDisability} onClick={() => {
                dispatch(setCurrentQuestionTeacher())
            }} >Next Question</button>

        </div>
    )
}
