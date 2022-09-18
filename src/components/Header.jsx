import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice, { logout } from '../slices/apiSlice'
import {useNavigate} from "react-router-dom"
export default function Header() {
    let dispatch = useDispatch(apiSlice)
    let state = useSelector(state => state.apiSlice)
    let goTo = useNavigate()

    return (
        <div style={{ justifyContent: state.profile ? "space-between" : "center" }} className='header' >
            <div className='row' >
                <img src="./boy.png" alt="" />
                <h1>
                    QuizUp
                </h1>
            </div>
            {state.profile ? <div className='row' >
                <button onClick={()=>goTo("/teacher/templates")} >Templates</button>
                <button onClick={()=>goTo("/teacher/reports")}>Reports</button>
            </div> : null}
            {state.profile ? <button onClick={() => {
                dispatch(logout())
                goTo("/login")
            }
            } >
                Logout
            </button> : null}

        </div>
    )
}
