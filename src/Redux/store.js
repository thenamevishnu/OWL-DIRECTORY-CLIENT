import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { siteReducer } from "./slices/sites.slice";
import { userReducer } from "./slices/user.slice";
import { themeReducer } from "./slices/theme.slice";

const persistConfig = {
    sites: {
        key: "sites",
        storage
    },
    user: {
        key: "user",
        storage
    },
    theme: {
        key: "theme",
        storage
    }
}

const persistedSitesReducer = persistReducer(persistConfig.sites, siteReducer)
const persistedUserReducer = persistReducer(persistConfig.user, userReducer)
const persistedThemeReducer = persistReducer(persistConfig.theme, themeReducer)

export const store = configureStore({
    reducer: {
        sites: persistedSitesReducer,
        user: persistedUserReducer,
        theme: persistedThemeReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [
                "persist/PERSIST"
            ]
        }
    })
})

export const persistor = persistStore(store)