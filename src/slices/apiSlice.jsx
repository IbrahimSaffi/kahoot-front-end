import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const createUser = createAsyncThunk(
    "auth / signup",
    async (data) => {
        let res = await fetch("http://localhost:8000/auth/signup", {
            method: "POST",
            body: data
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const loginUser = createAsyncThunk(
    "auth / login",
    async (data) => {
        let res = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            body: data
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const getRandomQuestion = createAsyncThunk(
    "question / random",
    async (data, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch("http://localhost:8000/question/", {
            method: "GET",
            headers: {
                Authorization: "Bearer" + state.accessToken
            }
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const addQuestion = createAsyncThunk(
    "question / add",
    async (data, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch("http://localhost:8000/question/add", {
            method: "GET",
            headers: {
                Authorization: "Bearer" + state.accessToken
            }
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const getSpecificQuestion = createAsyncThunk(
    "question / get",
    async (id, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch(`http://localhost:8000/question/${id}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer" + state.accessToken
            }
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const editQuestion = createAsyncThunk(
    "question / edit",
    async (id, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch(`http://localhost:8000/question/${id}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer" + state.accessToken
            }
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const deleteQuestion = createAsyncThunk(
    "question / get",
    async (id, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch(`http://localhost:8000/question/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer" + state.accessToken
            }
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const getTemplate = createAsyncThunk(
    "quiz / get",
    async (id, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch(`http://localhost:8000/quiz/${id}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer" + state.accessToken
            }
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const editTemplate = createAsyncThunk(
    "quiz / edit",
    async (id, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch(`http://localhost:8000/quiz/${id}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer" + state.accessToken
            }
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const deleteTemplate = createAsyncThunk(
    "quiz / delete",
    async (id, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch(`http://localhost:8000/quiz/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer" + state.accessToken
            }
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
export const createTemplate = createAsyncThunk(
    "quiz / delete",
    async (data, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch(`http://localhost:8000/quiz/`, {
            method: "POST",
            headers: {
                Authorization: "Bearer" + state.accessToken
            }
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)

let apiSlice = createSlice({
    name: "apiSlice",
    initialState: {
        accessToken: localStorage.getItem("ACCESS_TOKEN"),
        profile: JSON.parse(localStorage.getItem("PROFILE")),
        currQuestionIndex: 0,//Teacher side
        currQuestionData:null,//student side
        questions: [],
        templates:[],
        currTemplate:{
            "_id": "632308d9e5a90af31ff22155",
            "questions": [
                {
                    "_id": "6325ca803f690f2455ed7e84",
                    "text": "What member of the Galactica crew was eventually promoted to commander and placed in command of the Pegasus?",
                    "type": "True/False",
                    "choices": [
                        "True",
                        "False"
                    ],
                    "timer": 10,
                    "creater": "6322e713204fb3e59b4bd411",
                    "public": true,
                    "played": 0,
                    "correct_answer": "True",
                    "correctly_answered": 0,
                    "__v": 0
                },
                {
                    "_id": "6325ca2ceea588ff9ca05771",
                    "text": "What member of the Galactica crew was eventually promoted to commander and placed in command of the Pegasus?",
                    "type": "MCQ",
                    "choices": [
                        1,
                        2,
                        3,
                        4
                    ],
                    "timer": 30,
                    "creater": "6322e713204fb3e59b4bd411",
                    "public": true,
                    "played": 0,
                    "correct_answer": "4",
                    "correctly_answered": 0,
                    "__v": 0
                },
                {
                    "_id": "6325ca24eea588ff9ca0576f",
                    "text": "What member of the Galactica crew was eventually promoted to commander and placed in command of the Pegasus?",
                    "type": "MCQ",
                    "choices": [
                        1,
                        2,
                        3,
                        4
                    ],
                    "timer": 20,
                    "creater": "6322e713204fb3e59b4bd411",
                    "public": true,
                    "played": 0,
                    "correct_answer": "1",
                    "correctly_answered": 0,
                    "__v": 0
                },
                {
                    "_id": "6325ca18eea588ff9ca0576d",
                    "text": "What member of the Galactica crew was eventually promoted to commander and placed in command of the Pegasus?",
                    "type": "MCQ",
                    "choices": [
                        1,
                        2,
                        3,
                        4
                    ],
                    "timer": 15,
                    "creater": "6322e713204fb3e59b4bd411",
                    "public": true,
                    "played": 0,
                    "correct_answer": "3",
                    "correctly_answered": 0,
                    "__v": 0
                }
            ],
            "title": "test",
            "updated_at": "2022-09-15T11:13:10.377Z",
            "created_at": "2022-09-15T11:13:10.377Z",
            "rank": 0,
            "__v": 0
        },
        roomId:null,
        socket:null,
        name:null,//For one time login
        studentsJoined:[],
        //Every time there is error show on top as popup for couple of seconds
        error: "",
        //Might not need it
        loading: false
    },
    reducers: {
        setRoomId:(state,action)=>{
       state.roomId= action.payload
        },
        setSocket:(state,action)=>{
            state.socket = action.payload
        },
        oneTimeLogin:(state,action)=>{
            state.name = action.payload
        },
        studentJoined:(state,action)=>{
            state.studentsJoined.push(action.payload)
        },
        setCurrentQuestionTeacher:(state,action)=>{
                state.currQuestionIndex++
        },
        setCurrentQuestionStudent:(state,action)=>{
            state.currQuestionData = action.payload
        },
        updateReport:(state,action)=>{
            console.log(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
        })
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
            state.profile = action.payload
            state.templates = action.payload.profile.quizes
            state.accessToken = action.payload.accessToken
            localStorage.setItem("PROFILE", JSON.stringify(action.payload))
        })
        builder.addCase(getRandomQuestion.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(getRandomQuestion.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(getRandomQuestion.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
            state.currQuestion = action.payload
        })
        builder.addCase(addQuestion.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(addQuestion.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(addQuestion.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
            state.questions.push(action.payload.data)
        })
        //Might not need
        builder.addCase(getSpecificQuestion.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(getSpecificQuestion.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(getSpecificQuestion.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
            state.currQuestion = action.payload
        })
        builder.addCase(editQuestion.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(editQuestion.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(editQuestion.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
            let updatedQuestionIndex = state.questions.findIndex(question=>action.payload.data._id===question._id)
            state.questions.splice(updatedQuestionIndex,1,action.payload.data)
        })
        // builder.addCase(deleteQuestion.pending, (state, action) => {
        //     state.loading = true
        //     state.error = ""
        // })
        // builder.addCase(deleteQuestion.rejected, (state, action) => {
        //     state.error = action.error.message
        //     throw state.error
        // })
        // builder.addCase(deleteQuestion.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.error = ""
        //     let deletedQuestionIndex = state.questions.findIndex(question=>action.payload.id===question._id)
        //     state.questions.splice(deletedQuestionIndex,1)
        // })
        builder.addCase(getTemplate.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(getTemplate.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(getTemplate.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
           state.currTemplate = action.payload
        })
        builder.addCase(editTemplate.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(editTemplate.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(editTemplate.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
           let updatedTemplateIndex  = state.templates.findIndex(template=>template._id===action.payload.data._id)
           state.templates.splice(updatedTemplateIndex,1,action.payload.data)
        })
        builder.addCase(deleteTemplate.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(deleteTemplate.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(deleteTemplate.fulfilled, (state, action) => {
            state.loading = false
            state.error = ""
            let deletedTemplateIndex  = state.templates.findIndex(template=>template._id===action.payload.id)
           state.templates.splice(deletedTemplateIndex,1)
        })
        // builder.addCase(createTemplate.pending, (state, action) => {
        //     state.loading = true
        //     state.error = ""
        // })
        // builder.addCase(createTemplate.rejected, (state, action) => {
        //     state.error = action.error.message
        //     throw state.error
        // })
        // builder.addCase(createTemplate.fulfilled, (state, action) => {
        //     state.loading = false
        //     state.error = ""
        //    state.templates.push(action.payload.data)
        // })
    }
})
export const {setRoomId,setSocket,oneTimeLogin,studentJoined,setCurrentQuestionStudent,setCurrentQuestionTeacher,updateReport} =apiSlice.actions
export default apiSlice.reducer
