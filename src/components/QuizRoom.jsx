import React from 'react'
import { customAlphabet, nanoid } from 'nanoid'
import { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import apiSlice, { setRoomId } from '../slices/apiSlice'
import QRCode from "react-qr-code";

export default function QuizRoom() {
    let dispatch = useDispatch(apiSlice)
  let state = useSelector(state=>state.apiSlice)
    useEffect(()=>{
        //got idea to generate number from here
        // https://stackoverflow.com/questions/61650241/generate-18-digit-unique-number
      const nanoid = customAlphabet('1234567890', 9)
       let roomId =  nanoid().split("")
       roomId.splice(3,0,"-")
       roomId.splice(7,0,"-")
       roomId = roomId.join("")
       dispatch(setRoomId(roomId))
    },[])
  return (
    <div>
   <p>Pincode:{state.roomId}</p>
   <QRCode value={`${window.location.origin}/join-quiz/${state.roomId}`} />
    </div>
  )
}
