import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
    name: "sites",
    initialState: {
        most_visited: [],
        recently_visited: []
    },
    reducers: {
        addMostVisited: (state, action) => {
            const index = state.most_visited.findIndex(item => item.url == action.payload.url)
            if (index == -1) {
                state.most_visited = [{ ...action.payload, visited: 1 }, ...state.most_visited]
            } else {
                state.most_visited = state.most_visited.map(item => {
                    if(item.url == action.payload.url) {
                        return { ...item, visited: item.visited + 1 }
                    }
                    return item
                })
            }
        },
        addRecentlyVisited: (state, action) => {
            const item = state.recently_visited.find(item => item.url == action.payload.url)
            if (!item) {
                state.recently_visited = [action.payload, ...state.recently_visited]
            } else {
                state.recently_visited = state.recently_visited.filter(item => item.url != action.payload.url)
                state.recently_visited = [item, ...state.recently_visited]
            }
        },
        removeFromMostVisited: (state, action) => {
            state.most_visited = state.most_visited.filter(item => item.id != action.payload.id)
        },
        removeFromRecentlyVisited: (state, action) => {
            state.recently_visited = state.recently_visited.filter(item => item.id != action.payload.id)
        },
        clearMostVisited: (state) => {
            state.most_visited = []
        },
        clearRecentlyVisited: (state) => {
            state.recently_visited = []
        }
    }
})

export const { addMostVisited, addRecentlyVisited, removeFromMostVisited, removeFromRecentlyVisited, clearMostVisited, clearRecentlyVisited } = siteSlice.actions
export const { reducer: siteReducer } = siteSlice