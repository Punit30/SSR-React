"use client"

import { createSlice } from "@reduxjs/toolkit"
import _ from "lodash"

const initialState = {
	trackingDetails: [],
}

const trackFormSlice = createSlice({
	name: "trackForm",
	initialState,
	reducers: {
		setTracking(state, action) {
			return { ...state, trackingDetails: [...state.trackingDetails, action.payload] }
		},
		removeTracking(state, action) {
			const trackingDetails = _.filter(state.trackingDetails, (message) => action.payload !== message.id)
			return { ...state, trackingDetails: trackingDetails }
		},
		hardSetTracking(state, action) {
			return { ...state, trackingDetails: action.payload }
		},
		resetTracking(state, action) {
			return { ...state, trackingDetails: [] }
		},
	},
})

export const { setTracking, removeTracking, hardSetTracking, resetTracking } = trackFormSlice.actions
export default trackFormSlice.reducer
