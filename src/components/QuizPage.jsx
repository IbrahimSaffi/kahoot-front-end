import React, { useState } from 'react'
import { useEffect } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useDispatch, useSelector } from 'react-redux'
import { io } from "socket.io-client"
import apiSlice, { setCurrentQuestionStudent, setSocket } from '../slices/apiSlice'
export default function QuizPage() {
    let dispatch = useDispatch(apiSlice)
    let state = useSelector(state => state.apiSlice)
    let [result, showResult] = useState(false)
    let [selectedOption, setSelected] = useState(null)
    let [timer, setTimer] = useState(null)

    useEffect(() => {
        let socket = io("https://kahoot-clone1.herokuapp.com/")
        console.log("socket created", socket.id)
        dispatch(setSocket(socket))

    }, [])
    useEffect(() => {
        if (state.socket) {
            state.socket.emit("join-room", { roomId: state.roomId, name: state.name })
            state.socket.on("update-question", (data) => {
                console.log(data)
                dispatch(setCurrentQuestionStudent(data))
            })
        }
    }, [state.socket])
    useEffect(() => {
        if (state.currQuestionData) {
            setSelected(null)
            setTimeout(() => {
                console.log("here")
                showResult(true)
            }, state.currQuestionData.timer * 1000)
            showResult(false)
            setTimer(state.currQuestionData.timer)
        }
    }, [state.currQuestionData])
    useEffect(() => {
        if (state.socket) {
            console.log(selectedOption)
            state.socket.emit("receive-answer", { roomId: state.roomId, answer: selectedOption })
        }
    }, [selectedOption])
    return (
        <div className='quiz'>

            {!state.currQuestionData ?
                <p>
                    "Waiting for quiz to start"
                </p> :
                <div>
                    <img style={{ width: "500px" }} src={state.currQuestionData.img} alt="" />
                    <p>
                        {state.currQuestionData.text}
                    </p>
                    <div className="timer">
                    <CountdownCircleTimer className="timer"
                        key={timer}
                        isPlaying
                        duration={timer}
                        colors={"red"}
                        size={"100"}
                    ></CountdownCircleTimer>
                    </div>
                    <div className='row' >
                        {state.currQuestionData.choices.map((choice, i) => {
                            console.log(choice, state.currQuestionData.correct_answer)
                            return <button key={state.currQuestionData._id + i} className={String(choice).toLowerCase() == state.currQuestionData.correct_answer.toLowerCase() && result ? "selected" : ""} disabled={result} onClick={() => {
                                state.socket.emit("receive-answer", { roomId: state.roomId, answer: i })
                                setSelected(i)
                            }}>{
                                    selectedOption === i ? <img src="./check.png" alt="" /> : null
                                } {choice}</button>
                        })}

                    </div>
                </div>}


        </div>
    )
}
