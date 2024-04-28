"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	authority: "",
	email: "",
	firstName: "",
	lastName: "",
	profilePic: "",
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			return { ...state, ...action.payload }
		},
		setUserEmail(state, action) {
			return { ...state, email: action.payload }
		},
		resetUser(state, action) {
			return { authority: "", email: "", firstName: "", lastName: "", profilePic: "" }
		},
	},
})

export const { setUser, setUserEmail, resetUser } = userSlice.actions
export default userSlice.reducer
