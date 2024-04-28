"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	accessToken: "",
	refreshToken: "",
	expiry: "",
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth(state, action) {
			return {
				...state,
				accessToken: action.payload.accessToken,
				refreshToken: action.payload.refreshToken,
				expiry: action.payload.expiry,
			}
		},
		removeAuth(state, action) {
			return { ...state, accessToken: "", refreshToken: "", expiry: "" }
		},
	},
})

export const { setAuth, removeAuth } = authSlice.actions
export default authSlice.reducer
