import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice, { deleteTemplate, editTemplatePage, getTemplate, templateReload } from '../slices/apiSlice'
import {useNavigate} from "react-router-dom"
export default function Templates() {
    let dispatch = useDispatch(apiSlice)
    let state = useSelector(state => state.apiSlice)
    let goTo = useNavigate()
   useEffect(()=>{
    if(state.profile){
        dispatch(templateReload())
    }
    else{
        goTo("/login")
    }
    //Setting templates on reload
    //reseting editMode
   },[])
    return (
        <div className='templates' >
            {state.templates.length>0?state.templates.map((template,i) => {
                return <div className="template-card">
                   <h1>
                    {template.title}
                    </h1> 
                    <p>{template.updated_at}</p>
                    <div className="template-card-btns">
                        <button onClick={()=>dispatch(deleteTemplate(template._id))} >Delete</button>
                        <button onClick={()=>
                            {
                            dispatch(getTemplate(template._id))
                            dispatch(editTemplatePage(i))
                             goTo("/create-template")
                            }} >Edit</button>
                        <button onClick={()=>
                                {dispatch(getTemplate(template._id))
                                goTo("/quiz-room")}
                        } >Start</button>
                    </div>
                </div>
            }):"Wow such empty"}
            <button onClick={()=>goTo("/create-template")}>Create New Template</button>
        </div>
    )
}
