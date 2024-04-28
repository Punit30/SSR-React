import { gql } from "@apollo/client"

export const getAllResourceGroupsQuery = gql`
	query {
		getAllResourcesByGroup {
			id
			title
			description
			resources {
				id
				title
				topics
				specialities
				description
				resourceType
				resourceLink
				credits
				sequenceNumber
				tags
				resourceFormat
				expirationDate
				requiredStates
			}
			sequenceNumber
		}
	}
`

export const getResourceTitleList = gql`
	query {
		getResourceTitleList {
			id
			title
		}
	}
`
