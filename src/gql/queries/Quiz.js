import { gql } from "@apollo/client"

export const getAllQuestionsQuery = gql`
	query {
		getAllQuestions {
			id
			question
			specialities
			topics
			tags
			isMultiChoice
			allowPartialScores
			marks
			options {
				id
				value
				isCorrect
			}
		}
	}
`

export const getAllQuizByProviderIdQuery = gql`
	query getAllQuizByProviderId($providerId: String!) {
		getAllQuizByProviderId(providerId: $providerId) {
			id
			attemptNumber
			score
			totalScore
			providerId
			createdDateTime
			startTime
			endTime
			status
			result
		}
	}
`

export const getQuizReportQuery = gql`
	query getquizReport($quizId: String!) {
		getQuizReport(quizId: $quizId) {
			id
			quizId
			attributes {
				key
				value
			}
		}
	}
`

export const getQuizDetailedReportQuery = gql`
	query getQuizDetailedReport($quizId: String!) {
		getQuizDetailedReport(quizId: $quizId) {
			id
			question
			options {
				id
				value
				isCorrect
				isSelected
			}
			isAnswered
			marksObtained
		}
	}
`
