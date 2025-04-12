import { createSlice } from "@reduxjs/toolkit";

const list = [{
        icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpiunikaweb.com%2Fwp-content%2Fuploads%2F2020%2F11%2Fgoogle-meet.png&f=1&nofb=1&ipt=077f5b5a3d4516295b7780e06a9d417388ecf32f71f13786eccec3b0393d5b85",
        label: "Google Meet",
        url: "https://meet.google.com" 
    }, {
        icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgitlab.com%2Fuploads%2F-%2Fsystem%2Fproject%2Favatar%2F42900888%2Ficon1000x1000.png&f=1&nofb=1&ipt=dd6c7874953ab4b002534cf9d15ed45920e2b6d660fd8109a6c59519c9d2f000",
        label: "ChatGPT",
        url: "https://chat.openai.com"
    }
]

const siteSlice = createSlice({
    name: "sites",
    initialState: {
        most_visited: list,
        recently_visited: list
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
            const index = state.recently_visited.findIndex(item => item.url == action.payload.url)
            if (index == -1) {
                state.recently_visited = [action.payload, ...state.recently_visited]
            } else {
                state.recently_visited = state.recently_visited.filter(item => item.url != action.payload.url)
                state.recently_visited = [action.payload, ...state.recently_visited]
            }
        },
        removeFromMostVisited: (state, action) => {
            state.most_visited = state.most_visited.filter(item => item.id != action.payload.id)
        },
        removeFromRecentlyVisited: (state, action) => {
            state.recently_visited = state.recently_visited.filter(item => item.id != action.payload.id)
        }
    }
})

export const { addMostVisited, addRecentlyVisited, removeFromMostVisited, removeFromRecentlyVisited } = siteSlice.actions
export const { reducer: siteReducer } = siteSlice