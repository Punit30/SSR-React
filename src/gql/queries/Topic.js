import { gql } from "@apollo/client"

export const getTopicListQuery = gql`
	query {
		getTopicList {
			id
			topicName
		}
	}
`
