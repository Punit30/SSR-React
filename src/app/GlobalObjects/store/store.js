"use client"

import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
// import { encryptTransform } from "redux-persist-transform-encrypt"
import sessionStorage from "redux-persist/es/storage/session"
import storage from "redux-persist/lib/storage"
import authReducer from "./reducers/Auth"
import commonReducer from "./reducers/Common"
import dataReducer from "./reducers/Data"
import trackFormReducer from "./reducers/GAFormTracker"
import layoutReducer from "./reducers/Layout"
import modalReducer from "./reducers/Modal"
import refreshReducer from "./reducers/Refresh"
import userReducer from "./reducers/User"
import profileStartFormReducer from "./reducers/provider/ProfileStartForms"
import providerReducer from "./reducers/provider/Provider"
import quizReducer from "./reducers/provider/Quiz"
import courseReducer from "./reducers/admin/Course"

export const localPersistConfig = {
	key: "root",
	version: 1,
	whitelist: ["authReducer", "userReducer", "providerReducer", "courseReducer"],
	storage: storage,
	// transforms: [
	// 	encryptTransform({
	// 		secretKey: "575d9c52-09c5-478b-8fab-8fb7bcdaa683",
	// 		onError: (err) => {
	// 			console.log("err", err)
	// 		},
	// 	}),
	// ],
}

export const sessionPersistConfig = {
	key: "session",
	version: 1,
	whitelist: ["layoutReducer", "quizReducer", "profileStartFormReducer"],
	storage: sessionStorage,
	// transforms: [
	// 	encryptTransform({
	// 		secretKey: "575d9c52-09c5-478b-8fab-8fb7bcdaa683",
	// 		onError: (err) => {
	// 			console.log("err", err)
	// 		},
	// 	}),
	// ],
}

const sessionReducers = combineReducers({
	layoutReducer,
	quizReducer,
	profileStartFormReducer,
})

const localReducer = combineReducers({
	authReducer,
	userReducer,
	courseReducer,
	providerReducer,
})

const rootReducer = combineReducers({
	session: persistReducer(sessionPersistConfig, sessionReducers),
	local: persistReducer(localPersistConfig, localReducer),
	refreshReducer,
	modalReducer,
	commonReducer,
	trackFormReducer,
	dataReducer,
})

const store = configureStore({
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== "production",
})

export const persistore = persistStore(store)

export default store
