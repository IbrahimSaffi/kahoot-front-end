import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import apiSlice, { oneTimeLogin, setRoomId } from '../slices/apiSlice'

export default function JoinQuizPage() {
    let id = useParams().id
    let goTo = useNavigate()
    let dispatch = useDispatch(apiSlice)
    let roomId = useRef(null)
    let name = useRef(null)
    
  return (
    <div className='form join-quiz' >
        <p>Enter PINCODE</p>
        <input ref={roomId} type="text" defaultValue={id?id:""} disabled={id}  />
        <p>Enter Name</p>
        <input ref={name} type="text" />
        <button onClick={()=>{
          dispatch(setRoomId(roomId.current.value))
          dispatch(oneTimeLogin(name.current.value))
          goTo("/quiz")
          }}>Join Quiz</button>
    </div>
  )
}
