import { gql } from "@apollo/client";

export const contactUsMutation = gql`
	mutation ContactUs(
		$firstName: String!
		$lastName: String!
		$email: String!
		$message: String!
		$userType: String!
	) {
		submitContactUs(
			contactUs: {
				firstName: $firstName
				lastName: $lastName
				email: $email
				message: $message
				userType: $userType
			}
		) {
			message
			statusCode
		}
	}
`
