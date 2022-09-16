import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function StartPage() {
    let goTo = useNavigate()
  return (
    <div>
        <button onClick={()=>goTo("/login")} >I am a teacher</button>
        <button onClick={()=>goTo("/join-quiz")} >I am a student</button>
    </div>
  )
}
