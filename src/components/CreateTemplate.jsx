import React, { createRef, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiSlice, { addQuestion, deleteQuestion, setError } from '../slices/apiSlice'

export default function CreateTemplate() {
    // let MCQ =useRef()
    let dispatch = useDispatch(apiSlice)
    let state = useSelector(state => state.apiSlice)
    let question = useRef()
    let noOfOptionsRef = useRef()
    let timer =useRef()
    let [correctOption,SetCorrect] = useState(null)
    let [type,setType] = useState("TrueFalse")
    let [img,setImg] = useState(null)
    let [noOfOptions,setOptions] = useState(new Array(4).fill(0))
    //https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks 
    let [optionRefs,setRefs] = useState([])
    useEffect(()=>{
      let tempRefs =  noOfOptions.map((option,i)=>createRef())
      setRefs(tempRefs)
    },[noOfOptions])

    return (
        <div className='create-template' >
            <div className='questions' >
                {state.questions.length!==0?state.questions.map(question=>{
                    return <div className="question-card">
                        <div className="question-card-btns">
                        <button>Move UP</button>
                        <button>Edit</button>
                        <button>Move Down</button>
                        </div>
                        <button onClick={()=>dispatch(deleteQuestion(question._id))} >Delete</button>
                    </div>
                }):"No Questions Added"}
                <button onClick={()=>{
                        let choices = []
                        if(type==="MCQ")
                        optionRefs.forEach(ele=>{
                            // console.log(ele.current.value)
                            choices.push(ele.current.value)
                        })
                        if(question.current.value.length!==0&&correctOption!==null){
                            const formData = new FormData()
                            formData.append("text",question.current.value)
                            if(type==="MCQ"){
                                formData.append("choices",choices)
                            }
                            formData.append("type",type)
                            formData.append("creater",state.profile._id)
                            formData.append("timer",timer.current.value)
                            formData.append("img",img)
                            if(type==="MCQ"){
                                formData.append("correct_answer",optionRefs[correctOption].current.value)
                            }
                            else{
                                formData.append("correct_answer",correctOption)
                            }
                            //Some code copied from my own old code
                            
                            dispatch(addQuestion(formData)).catch(err=>dispatch(setError(err.message)))
                        }
                        else{
                            dispatch(setError("Some Fields Missing"))
                        }
                     }} >Add Question</button>
            </div>
            <div className='question' >
                <input ref={question} type="text" placeholder='Write your question here' />
                <input onChange={(e)=>setImg(e.target.files[0])}  type="file" accept="image/png, image/jpeg" />
                <div className='row' >
                    <p>True/False</p>
                    <input onClick={()=>{
                            setType("TrueFalse")
                    }} defaultChecked={true} type="radio" name="type" value={"True/False"} />
                    <p>MCQ</p>
                    <input onClick={()=>{
                            setType("MCQ")
                    }}  type="radio" name="type" value={"MCQ"} />
                </div>
                {type==="TrueFalse"?<div className="choices row">
                    <button className={correctOption===true?'selected':""} >True <img onClick={()=>SetCorrect(true)} src="./check.png" alt="" /> </button>
                    <button className={correctOption===false?'selected':""} >False <img onClick={()=>SetCorrect(false)} src="./check.png" alt="" /> </button>
                </div>:<div className='col' >
                    <div className='row'>
                    <p>No of options</p>
                    <input onChange={()=>setOptions(new Array(Number(noOfOptionsRef.current.value)).fill(0))} ref={noOfOptionsRef} defaultValue={4} type="number" min={2} max={5} />

                    </div>
                    <div className='choices row' >
                    {noOfOptions.map((option,i)=>{
                        return <button className={i===correctOption?'selected':""} > <input ref={optionRefs[i]}  type="text" placeholder={`Option ${i+1}`} /> <img onClick={()=>SetCorrect(i)} src="./check.png" alt="" /> </button>
                    })}
                    </div>
                    </div>}
                    <div className='row' >
                    <p>Timer</p>
                    <input className='timer-inp' defaultValue={30}  ref={timer} type="number" />
                    </div>
                     
            </div>
        </div>
    )
}
