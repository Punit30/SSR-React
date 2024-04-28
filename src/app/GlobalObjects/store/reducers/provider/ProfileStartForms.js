"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = { formNo: 0 }

const profileStartFormSlice = createSlice({
	name: "profileStartForms",
	initialState,
	reducers: {
		setForm(state, action) {
			return { ...state, ...action.payload }
		},
	},
})

export const { setForm } = profileStartFormSlice.actions
export default profileStartFormSlice.reducer
