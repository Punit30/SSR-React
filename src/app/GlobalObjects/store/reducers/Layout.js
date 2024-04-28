"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	forgetPass: { email: "", OTPVerified: false },
	providerSignUp: { providerId: null, email: "", step: 0 },
}

const layoutSlice = createSlice({
	name: "layout",
	initialState,
	reducers: {
		setForgetPass(state, action) {
			return { ...state, forgetPass: { ...state.forgetPass, ...action.payload } }
		},
		setProviderSignUp(state, action) {
			return { ...state, providerSignUp: { ...state.providerSignUp, ...action.payload } }
		},
		setProviderSignupStep(state, action) {
			return { ...state, providerSignUp: { ...state.providerSignUp, step: action.payload } }
		},
		resetLayout(state, action) {
			return {
				...state,
				forgetPass: { username: "", OTPVerified: false },
				providerSignUp: { providerId: null, email: "", step: 0 },
			}
		},
	},
})

export const { setForgetPass, setProviderSignUp, setProviderSignupStep, resetLayout } = layoutSlice.actions
export default layoutSlice.reducer
