import { compose, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
export const createUser = createAsyncThunk(
    "auth / signup",
    async (data) => {
        console.log(data)
        let res = await fetch("https://kahoot-clone1.herokuapp.com/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
        let res = await fetch("https://kahoot-clone1.herokuapp.com/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
        let res = await fetch("https://kahoot-clone1.herokuapp.com/question/", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + state.accessToken
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
        for (var key of data.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
        let state = getState().apiSlice
        console.log(state.accessToken)
        let res = await fetch("https://kahoot-clone1.herokuapp.com/question/add", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + state.accessToken
            },
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
export const getSpecificQuestion = createAsyncThunk(
    "question / get",
    async (id, { getState }) => {
        console.log(id)
        let state = getState().apiSlice
        let res = await fetch(`https://kahoot-clone1.herokuapp.com/question/${id}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + state.accessToken,
                'Content-Type': 'application/json',
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
    async (data, { getState }) => {
        console.log(data.content)
        for (var key of data.content.entries()) {
            console.log(key[0] + ', ' + key[1])
        }
        console.log(data)
        let state = getState().apiSlice
        let res = await fetch(`https://kahoot-clone1.herokuapp.com/question/${data.id}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + state.accessToken
            },
            body: data.content
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
    "question / delete",
    async (id, { getState }) => {
        console.log(id)
        let state = getState().apiSlice
        let res = await fetch(`https://kahoot-clone1.herokuapp.com/question/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + state.accessToken
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
        let res = await fetch(`https://kahoot-clone1.herokuapp.com/quiz/${id}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + state.accessToken
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
    async (data, { getState }) => {
        console.log(data)
        let state = getState().apiSlice
        let res = await fetch(`https://kahoot-clone1.herokuapp.com/quiz/${data.id}`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + state.accessToken,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data.content)
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
        let res = await fetch(`https://kahoot-clone1.herokuapp.com/quiz/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + state.accessToken
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
    "quiz / create",
    async (data, { getState }) => {
        let state = getState().apiSlice
        let res = await fetch(`https://kahoot-clone1.herokuapp.com/quiz/`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + state.accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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
        refreshToken: localStorage.getItem("REFRESH_TOKEN"),
        currQuestionIndex: 0,//Teacher side
        currQuestionData: null,//student side
        questions: [],
        templates: [],
        currTemplate: {
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
                    "timer": 5,
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
                    "timer": 5,
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
                    "timer": 5,
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
                    "timer": 5,
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
        roomId: null,
        socket: null,
        name: null,//For one time login
        studentsJoined: [],
        currAnswers: {}, //Answers given for particular question
        quizReport: {},
        answerCount: [],
        editPageMode:false,
        editQuestionMode:false,
        currentQuestion:null,//For editing question
        //Every time there is error show on top as popup for couple of seconds
        error: "",
        //Might not need it
        loading: false
    },
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload
        },
        setSocket: (state, action) => {
            state.socket = action.payload
        },
        oneTimeLogin: (state, action) => {
            state.name = action.payload
        },
        studentJoined: (state, action) => {
            state.studentsJoined.push(action.payload)
        },
        setCurrentQuestionTeacher: (state, action) => {
            state.currQuestionIndex++
        },
        setCurrentQuestionStudent: (state, action) => {
            console.log("redux",action.payload)
            state.currQuestionData = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        logout: (state, action) => {
            state.profile = null
            state.accessToken = null
            localStorage.setItem("PROFILE", null)
            localStorage.setItem("ACCESS_TOKEN", null)
        },
        moveItem: (state, action) => {
            console.log(current(state.questions))
            if (action.payload.index > 0 && action.payload.type === "up") {
                [state.questions[action.payload.index], state.questions[action.payload.index - 1]] = [state.questions[action.payload.index - 1], state.questions[action.payload.index]]
                console.log(current(state.questions))
            }
            if (action.payload.index < state.questions.length - 1 && action.payload.type === "down") {
                [state.questions[action.payload.index], state.questions[action.payload.index + 1]] = [state.questions[action.payload.index + 1], state.questions[action.payload.index]]
                console.log(current(state.questions))
            }
        },
        updateReport: (state, action) => {
            if (!state.quizReport.hasOwnProperty(action.payload.studentName)) {
                state.quizReport[action.payload.studentName] = {}
            }
            state.quizReport[action.payload.studentName][state.currQuestionIndex] = action.payload.answer
            state.currAnswers[action.payload.studentName] = action.payload.answer
            console.log(current(state.quizReport))
            //Number of answers each
            let answersArr = state.templates.questions[state.currQuestionIndex].choices.map((choice, i) => {
                let count = 0
                Object.values(state.currAnswers).forEach(ele => {
                    if (ele === i) {
                        count++
                    }
                })
                return count
            })
            state.answerCount = answersArr
            console.log(answersArr)
        },
        editTemplatePage: (state,action)=>{
         state.currTemplate = state.templates[action.payload]
         state.editPageMode =true
         state.questions = state.templates[action.payload].questions
        },
        templateReload:(state,action)=>{
            console.log(state.profile)
            // state.templates=state.profile.quizes
            state.editPageMode=false
            state.questions=[]
        },
        // questionEditMode:(state,action)=>{
        // //   state.questionToBeEdited =state.questions[action.payload]
        // //   state.editQuestionMode = true
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""

        })
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            state.profile = action.payload.profile

            state.templates = action.payload.profile.quizes
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            localStorage.setItem("PROFILE", JSON.stringify(action.payload.profile))
            localStorage.setItem("ACCESS_TOKEN", action.payload.accessToken)
            localStorage.setItem("REFRESH_TOKEN", action.payload.refreshToken)
        })
        builder.addCase(getRandomQuestion.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(getRandomQuestion.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(getRandomQuestion.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            state.currQuestion = action.payload
        })
        builder.addCase(addQuestion.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(addQuestion.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(addQuestion.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            state.questions.push(action.payload.data)
            state.currentQuestion=null
        })
        //Might not need
        builder.addCase(getSpecificQuestion.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(getSpecificQuestion.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(getSpecificQuestion.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            state.currQuestion = action.payload
            state.editQuestionMode = true
            console.log(state.currQuestion)
        })
        builder.addCase(editQuestion.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(editQuestion.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(editQuestion.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            let updatedQuestionIndex = state.questions.findIndex(question => action.payload.data._id === question._id)
            state.questions.splice(updatedQuestionIndex, 1, action.payload.data)
            state.currentQuestion=null
            console.log(action.payload.response)
        })
        builder.addCase(deleteQuestion.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(deleteQuestion.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(deleteQuestion.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            console.log(state.questions)
            let deletedQuestionIndex = state.questions.findIndex(question => action.payload.id === question._id||question===action.payload.id)

            state.questions.splice(deletedQuestionIndex, 1)
        })
        builder.addCase(getTemplate.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(getTemplate.rejected, (state, action) => {
            state.error = action.error.message
            throw state.error
        })
        builder.addCase(getTemplate.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            state.currTemplate = action.payload
            state.questions = action.payload.questions
            state.editPageMode=true
        })
        builder.addCase(editTemplate.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(editTemplate.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(editTemplate.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            let updatedTemplateIndex = state.templates.findIndex(template => template._id === action.payload.data._id)
            state.templates.splice(updatedTemplateIndex, 1, action.payload.data)
            state.editPageMode = false
        })
        builder.addCase(deleteTemplate.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(deleteTemplate.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(deleteTemplate.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            let deletedTemplateIndex = state.templates.findIndex(template => template._id === action.payload.id)
            state.templates.splice(deletedTemplateIndex, 1)
        })
        builder.addCase(createTemplate.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(createTemplate.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(createTemplate.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
            console.log(action.payload.data)
           state.templates.push(action.payload.data)
        })
    }
})
export const { setRoomId, setSocket, oneTimeLogin, studentJoined, setCurrentQuestionStudent, setCurrentQuestionTeacher, updateReport, setError, logout, moveItem ,editTemplatePage,templateReload,questionEditMode} = apiSlice.actions
export default apiSlice.reducer
