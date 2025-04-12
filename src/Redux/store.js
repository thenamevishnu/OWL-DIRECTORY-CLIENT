import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { siteReducer } from "./slices/sites.slice";

const persistConfig = {
    sites: {
        key: "sites",
        storage
    }
}

const persistedSitesReducer = persistReducer(persistConfig.sites, siteReducer)

export const store = configureStore({
    reducer: {
        sites: persistedSitesReducer
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