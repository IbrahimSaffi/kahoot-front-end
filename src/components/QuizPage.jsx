import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from "socket.io-client"
import apiSlice, { setCurrentQuestion, setCurrentQuestionStudent, setSocket } from '../slices/apiSlice'
export default function QuizPage() {
    let dispatch = useDispatch(apiSlice)
    let state = useSelector(state => state.apiSlice)
    let [btnDisability,setBtnDisability] = useState(false)
    useEffect(() => {
        let socket = io("http://localhost:8000/") 
        console.log("socket created",socket.id)
        dispatch(setSocket(socket))
        socket.emit("join-room", { roomId: state.roomId, name: state.name })
        socket.on("update-question", (data) => {
            dispatch(setCurrentQuestionStudent(data))
        })
    }, [])
  

    return (
        <div>
            {!state.currQuestionData ?
                <p>
                    "Waiting for quiz to start"
                </p> :
                <div>
                    <p>
                        {state.currQuestionData.text}
                    </p>
                    {state.currQuestionData.choices.map((choice,i) => {
                        return <button onClick={()=>{
                        state.socket.emit("receive-answer",{roomId:state.roomId,answer:i,socket:state.socket.id})
                        console.log("clicked")      
                        }} disabled={btnDisability}>{choice===state.currQuestionData.correct_answer&&btnDisability?"tick":null}{choice}</button>
                    })}
                </div>}


        </div>
    )
}
