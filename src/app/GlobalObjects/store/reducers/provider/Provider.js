"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = { providerId: "", hasCompletedSurvey: false, isBoarded: false }

const providerSlice = createSlice({
	name: "provider",
	initialState,
	reducers: {
		setProvider(state, action) {
			return { ...state, ...action.payload }
		},
	},
})

export const { setProvider } = providerSlice.actions
export default providerSlice.reducer
