import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        picture: null,
        name: ""
    },
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email
            state.picture = action.payload.picture
            state.name = action.payload.name
        },
        clearUser: (state) => {
            state.email = ""
            state.picture = null
            state.name = ""
        }
    }
})

export const { setUser, clearUser } = userSlice.actions
export const { reducer: userReducer } = userSlice