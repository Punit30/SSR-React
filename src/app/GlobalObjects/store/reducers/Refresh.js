"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	refresh: null,
	refreshContact: null,
	refreshAfterCall: null,
	refreshNumber: null,
	refreshMessageList: null,
	refreshMessages: null,
	refreshVersion: false,
}

const refreshSlice = createSlice({
	name: "refresh",
	initialState,
	reducers: {
		refresh(state, action) {
			return { ...state, refresh: !Boolean(state.refresh) }
		},
		refreshContact(state, action) {
			return { ...state, refreshContact: !Boolean(state.refreshContact) }
		},
		refreshAfterCall(state, action) {
			return { ...state, refreshAfterCall: !Boolean(state.refreshAfterCall) }
		},
		refreshNumber(state, action) {
			return { ...state, refreshNumber: !Boolean(state.refreshNumber) }
		},
		refreshMessageList(state, action) {
			return { ...state, refreshMessageList: !Boolean(state.refreshMessageList) }
		},
		refreshMessages(state, action){
			return {...state, refreshMessages: !Boolean(state.refreshMessages)}
		},
		refreshVersion(state, action) {
			return { ...state, refreshVersion: true }
		},
	},
})

export const { refresh, refreshContact, refreshAfterCall, refreshNumber, refreshMessages, refreshVersion, refreshMessageList } = refreshSlice.actions
export default refreshSlice.reducer
