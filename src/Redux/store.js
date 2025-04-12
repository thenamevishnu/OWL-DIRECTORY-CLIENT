import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { siteReducer } from "./slices/sites.slice";
import { userReducer } from "./slices/user.slice";

const persistConfig = {
    sites: {
        key: "sites",
        storage
    },
    user: {
        key: "user",
        storage
    }
}

const persistedSitesReducer = persistReducer(persistConfig.sites, siteReducer)
const persistedUserReducer = persistReducer(persistConfig.user, userReducer)

export const store = configureStore({
    reducer: {
        sites: persistedSitesReducer,
        user: persistedUserReducer
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