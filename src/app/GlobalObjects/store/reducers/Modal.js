"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	help: false,
	logout: false,
	contactUs: false,
	prePatientRegister: false,
	changeMail: { open: false, uri: "", username: "" },
}

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setModal(state, action) {
			return { ...state, ...action.payload }
		},
		setLogoutModal(state, action) {
			return { ...state, logout: action.payload }
		},
		setHelpModal(state, action) {
			return { ...state, help: action.payload }
		},
		setPrePatientRegisterModal(state, action) {
			return { ...state, prePatientRegister: action.payload }
		},
		setChangeMailModal(state, action) {
			return { ...state, changeMail: action.payload }
		},
	},
})

export const { setModal, setLogoutModal, setHelpModal, setPrePatientRegisterModal, setChangeMailModal } =
	modalSlice.actions
export default modalSlice.reducer
