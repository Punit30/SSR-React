import { gql } from "@apollo/client"

export const helpUsMutation = gql`
	mutation submitHelpUs(
		$issueType: String!
		$comment: String!
		$email: String!
		$firstName: String
		$lastName: String
	) {
		submitHelpUs(
			helpUs: {
				issueType: $issueType
				comment: $comment
				email: $email
				firstName: $firstName
				lastName: $lastName
			}
		) {
			statusCode
			message
		}
	}
`
