import { gql } from "@apollo/client"

export const getQuizMutation = gql`
	mutation getQuiz($providerId: String!) {
		getQuiz(providerId: $providerId) {
			id
			providerId
			createdDateTime
			startTime
			endTime
			questions {
				id
				question
				options {
					id
					value
				}
				isMultiChoice
			}
		}
	}
`

export const startQuizMutation = gql`
	mutation startQuiz($quizId: String!) {
		startQuiz(quizId: $quizId) {
			statusCode
			message
		}
	}
`

export const closeQuizMutation = gql`
	mutation closeQuiz($quizId: String!, $endTime: String!) {
		closeQuiz(closeQuizInput: { quizId: $quizId, endTime: $endTime }) {
			statusCode
			message
		}
	}
`

export const submitQuizAnswer = gql`
	mutation saveResponse($quizId: String!, $questionId: String!, $question: String!, $optionId: [String!]!) {
		saveResponse(
			submissionInput: {
				quizId: $quizId
				question: { id: $questionId, question: $question, optionId: $optionId }
			}
		) {
			statusCode
			message
		}
	}
`

export const dltQuestionMutation = gql`
	mutation deleteQuestion($id: String!) {
		deleteQuestion(id: $id) {
			statusCode
			message
		}
	}
`

export const updateQuestionMutation = gql`
	mutation updateQuestion(
		$id: Long!
		$question: String!
		$speciality: [String!]
		$topics: [String!]
		$isMultiChoice: Boolean!
		$allowPartialScores: Boolean!
		$tag: [ResourceTag!]
		$marks: Int!
	) {
		updateQuestion(
			question: {
				id: $id
				question: $question
				speciality: $speciality
				topics: $topics
				tag: $tag
				isMultiChoice: $isMultiChoice
				allowPartialScores: $allowPartialScores
				marks: $marks
			}
		) {
			message
			statusCode
		}
	}
`

export const addQuestionMutation = gql`
	mutation addQuestion(
		$question: String!
		$speciality: [String!]
		$topics: [String!]
		$isMultiChoice: Boolean!
		$allowPartialScores: Boolean!
		$tag: [ResourceTag!]
		$marks: Int!
		$options: [CreateOptionInput!]!
	) {
		addQuestion(
			question: {
				question: $question
				speciality: $speciality
				topics: $topics
				tag: $tag
				isMultiChoice: $isMultiChoice
				allowPartialScores: $allowPartialScores
				marks: $marks
				options: $options
			}
		) {
			message
			statusCode
		}
	}
`

export const dltOptionMutation = gql`
	mutation deleteOption($optionId: String!) {
		deleteOption(optionId: $optionId) {
			statusCode
			message
		}
	}
`
export const updateOptionsMutation = gql`
	mutation updateOptions($id: Long!, $value: String!, $isCorrect: Boolean) {
		updateOptions(option: { id: $id, value: $value, isCorrect: $isCorrect }) {
			message
			statusCode
		}
	}
`

export const addOptionsMutation = gql`
	mutation addOptions($questionId: Long!, $value: String!, $isCorrect: Boolean!) {
		addOptions(questionId: $questionId, options: [{ value: $value, isCorrect: $isCorrect }]) {
			message
			statusCode
		}
	}
`

export const resetQuizMutation = gql`
	mutation resetQuiz($providerId: Long!, $quizId: Long!) {
		resetQuiz(providerId: $providerId, quizId: $quizId) {
			statusCode
			message
		}
	}
`
