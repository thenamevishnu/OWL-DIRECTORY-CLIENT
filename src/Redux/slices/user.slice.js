import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        picture: null,
        name: "",
        meta_code: ""
    },
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email
            state.picture = action.payload.picture
            state.name = action.payload.name
            state.meta_code = action.payload.meta_code
        },
        clearUser: (state) => {
            state.email = ""
            state.picture = null
            state.name = ""
            state.meta_code = ""
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export const { reducer: userReducer } = userSlice