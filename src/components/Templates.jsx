import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice from '../slices/apiSlice'
import {useNavigate} from "react-router-dom"
export default function Templates() {
    let dispatch = useDispatch(apiSlice)
    let state = useSelector(state => state.apiSlice)
    console.log(state)
    let goTo = useNavigate()

    useEffect(() => {
    }, [])
    return (
        <div className='templates' >
            {state.templates.length>0?state.templates.map(template => {
                return <div className="template card">
                   <h1>
                    {template.title}
                    </h1> 
                    <p>{template.updated_at}</p>
                    <div className="template-card-btns">
                        <button>Delete</button>
                        <button>Edit</button>
                        <button>Start</button>
                    </div>
                </div>
            }):"Wow such empty"}
            <button onClick={()=>goTo("/create-template")}>Create New Template</button>
        </div>
    )
}
