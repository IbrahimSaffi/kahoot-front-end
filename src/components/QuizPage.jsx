import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from "socket.io-client"
import apiSlice, { setCurrentQuestionStudent, setSocket } from '../slices/apiSlice'
export default function QuizPage() {
    let dispatch = useDispatch(apiSlice)
    let state = useSelector(state => state.apiSlice)
    let [result, showResult] = useState(false)
    let [selectedOption,setSelected] = useState(null)
    useEffect(() => {
        let socket = io("http://localhost:8000/")
        console.log("socket created", socket.id)
        dispatch(setSocket(socket))
        socket.emit("join-room", { roomId: state.roomId, name: state.name })
        socket.on("update-question", (data) => {
            console.log(data)
            dispatch(setCurrentQuestionStudent(data))
        })
      
    }, [])

   useEffect(()=>{
       if(state.currQuestionData){
        setSelected(null)
        setTimeout(() => {
            console.log("here")
            showResult(true)
        }, state.currQuestionData.timer * 1000)
        showResult(false)
    }
   },[state.currQuestionData])
//    useEffect(()=>{
//     if(state.socket){
//         console.log(selectedOption)
//         state.socket.emit("receive-answer", { roomId: state.roomId, answer: selectedOption })
//     }
//    },[selectedOption])
    return (
        <div className='quiz'>
            {!state.currQuestionData ?
                <p>
                    "Waiting for quiz to start"
                </p> :
                <div>
                    <p>
                        {state.currQuestionData.text}
                    </p>
                    <div className='row' >
                    {state.currQuestionData.choices.map((choice, i) => {
                        return <button key={state.currQuestionData._id+i} className={choice.toLowerCase() == state.currQuestionData.correct_answer&& result?"selected":""}  disabled={result} onClick={() => {
                            state.socket.emit("receive-answer", { roomId: state.roomId, answer:i })
                        }}>{
                            selectedOption===i ? <img src="./check.png" alt="" /> : null
                            } {choice}</button>
                    })}

                    </div>
                </div>}


        </div>
    )
}
