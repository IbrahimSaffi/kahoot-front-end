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
        currQuestion: null,
        questions: [],
        templates:[],
        currTemplate:null,
        roomId:null,
        //Every time there is error show on top as popup for couple of seconds
        error: "",
        //Might not need it
        loading: false
    },
    reducers: {
        setRoomId:(state,action)=>{
       state.roomId= action.payload
        },
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
export const {setRoomId} =apiSlice.actions
export default apiSlice.reducer
