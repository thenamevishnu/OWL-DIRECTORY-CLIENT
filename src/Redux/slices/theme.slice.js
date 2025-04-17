import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        color: "#eee",
        background: "url(../bg-default.jpg)",
        link_color: "#ADC2FC"
    },
    reducers: {
        setTheme: (state, action) => {
            if(action.payload.color) state.color = action.payload.color
            if(action.payload.background) state.background = `url(${action.payload.background})`
            if(action.payload.link_color) state.link_color = action.payload.link_color
        }
    }
})

export const { setTheme } = themeSlice.actions
export const { reducer: themeReducer } = themeSlice