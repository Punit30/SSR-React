"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	quizId: null,
	totalQuestions: null,
	questions: [],
	currentQuestion: 0, // questionId
	optionSelected: [], // [{questionId: 1, optionId: 2}, {questionId: 2, optionId: 8}]
	endTime: null,
	startTime: null,
}

const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {
		setQuiz(state, action) {
			return { ...state, ...action.payload }
		},
		setCurrentQuestion(state, action) {
			return { ...state, currentQuestion: action.payload }
		},
		setOptionSelected(state, action) {
			return {
				...state,
				optionSelected: [...state.optionSelected, ...action.payload],
			}
		},
		resetQuiz(state, action) {
			return {
				quizId: null,
				totalQuestions: null,
				questions: [],
				currentQuestion: 0,
				optionSelected: [],
				endTime: null,
				startTime: null,
			}
		},
	},
})

export const { setQuiz, setCurrentQuestion, setOptionSelected, resetQuiz } = quizSlice.actions

export default quizSlice.reducer
