"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	courses: [],
}

const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {
		setCourses(state, action) {
			return { ...state, courses: action.payload }
		},
		resetCourses(state, action) {
			return { ...state, courses: [] }
		},
	},
})

export const { setCourses, resetCourses } = courseSlice.actions
export default courseSlice.reducer
