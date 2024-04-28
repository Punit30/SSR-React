"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	states: { data: [], lastUpdated: null },
	topics: { data: [], lastUpdated: null },
	degree: { data: [], lastUpdated: null },
	gender: { data: [], lastUpdated: null },
	pronoun: { data: [], lastUpdated: null },
	language: { data: [], lastUpdated: null },
	specialty: { data: [], lastUpdated: null },
	creditType: { data: [], lastUpdated: null },
	courseTitle: { data: [], lastUpdated: null },
	organization: { data: [], lastUpdated: null },
	patientGroup: { data: [], lastUpdated: null },
	resourceTitle: { data: [], lastUpdated: null },
	paymentOption: { data: [], lastUpdated: null },
	additionalServices: { data: [], lastUpdated: null },
}

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		setStates(state, action) {
			return { ...state, states: action.payload }
		},
		setOrganization(state, action) {
			return { ...state, organization: action.payload }
		},
		setSpecialty(state, action) {
			return { ...state, specialty: action.payload }
		},
		setTopics(state, action) {
			return { ...state, topics: action.payload }
		},
		setPronoun(state, action) {
			return { ...state, pronoun: action.payload }
		},
		setDegree(state, action) {
			return { ...state, degree: action.payload }
		},
		setGender(state, action) {
			return { ...state, gender: action.payload }
		},
		setLanguage(state, action) {
			return { ...state, language: action.payload }
		},
		setCourseTitle(state, action) {
			return { ...state, courseTitle: action.payload }
		},
		setResourceTitle(state, action) {
			return { ...state, resourceTitle: action.payload }
		},
		setAdditionalServices(state, action) {
			return { ...state, additionalServices: action.payload }
		},
		setPatientGroups(state, action) {
			return { ...state, patientGroup: action.payload }
		},
		setPaymentOption(state, action) {
			return { ...state, paymentOption: action.payload }
		},
		setCreditType(state, action) {
			return { ...state, creditType: action.payload }
		},
		resetData(state, action) {
			return {
				...state,
				states: { data: [], lastUpdated: null },
				topics: { data: [], lastUpdated: null },
				degree: { data: [], lastUpdated: null },
				gender: { data: [], lastUpdated: null },
				pronoun: { data: [], lastUpdated: null },
				language: { data: [], lastUpdated: null },
				specialty: { data: [], lastUpdated: null },
				creditType: { data: [], lastUpdated: null },
				courseTitle: { data: [], lastUpdated: null },
				organization: { data: [], lastUpdated: null },
				patientGroup: { data: [], lastUpdated: null },
				resourceTitle: { data: [], lastUpdated: null },
				paymentOption: { data: [], lastUpdated: null },
				additionalServices: { data: [], lastUpdated: null },
			}
		},
	},
})

export const {
	setTopics,
	setStates,
	setDegree,
	setGender,
	setPronoun,
	setLanguage,
	setSpecialty,
	setCreditType,
	setCourseTitle,
	setOrganization,
	setResourceTitle,
	setPaymentOption,
	setPatientGroups,
	setAdditionalServices,
	resetData,
} = dataSlice.actions
export default dataSlice.reducer
