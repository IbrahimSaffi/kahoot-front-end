import React from 'react'
import { useParams } from "react-router-dom"

export default function JoinQuizPage() {
    let id = useParams().id
  return (
    <div>
        <p>Enter PINCODE</p>
        <input type="text" defaultValue={id?id:""} disabled={id}  />
        <p>Enter Name</p>
        <input type="text" />
    </div>
  )
}
