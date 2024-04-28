import { gql } from "@apollo/client"

export const addTopicMutation = gql`
	mutation addTopic($topicName: String!) {
		addTopic(topicName: $topicName) {
			statusCode
			message
		}
	}
`

export const updateTopicMutation = gql`
	mutation updateTopic($topicId: String!, $newTopicName: String!) {
		updateTopic(topicId: $topicId, newTopicName: $newTopicName) {
			statusCode
			message
		}
	}
`

export const dltTopicMutation = gql`
	mutation deleteTopic($topicId: String!) {
		deleteTopic(topicId: $topicId) {
			statusCode
			message
		}
	}
`
