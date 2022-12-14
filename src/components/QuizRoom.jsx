import React from 'react'
import { customAlphabet, nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice, { getTemplate, setRoomId, setSocket, studentJoined } from '../slices/apiSlice'
import QRCode from "react-qr-code";
import {io} from "socket.io-client"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function QuizRoom() {
  let dispatch = useDispatch(apiSlice)
  let state = useSelector(state => state.apiSlice)
  let goTo = useNavigate()
  useEffect(() => {
    //got idea to generate number from here
    // https://stackoverflow.com/questions/61650241/generate-18-digit-unique-number
    const nanoid = customAlphabet('1234567890', 9)
    let roomId = nanoid().split("")
    roomId.splice(3, 0, "-")
    roomId.splice(7, 0, "-")
    roomId = roomId.join("")
    dispatch(setRoomId(roomId))
    dispatch(setSocket(io("https://kahoot-clone1.herokuapp.com/"))) 
    console.log(state.currTemplate)
  }, [])
  useEffect(()=>{
    if(state.socket){
      state.socket.emit("create-room",state.roomId)
      state.socket.on("joined-students-update",(data)=>{
        console.log(data)
        dispatch(studentJoined(data))
      })
    }
  },[state.socket])
  
  return (
    <div className='quiz-room' >
      <div className='row' >
      <div>
      {state.studentsJoined.length===0?
      <p>Waiting for students to join</p>:
      state.studentsJoined.map(ele=>{
        return <p>{ele.studentName} Joined</p>
      })}
      </div>
      <div>
      <QRCode value={`${window.location.origin}/join-quiz/${state.roomId}`} />
      <p>Pincode:{state.roomId}</p>
      </div>
      </div>
      <button onClick={()=>goTo("/live-report")} >Start Quiz</button>
    </div>
  )
}
