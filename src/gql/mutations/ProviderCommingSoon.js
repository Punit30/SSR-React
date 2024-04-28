import { gql } from "@apollo/client";

export const comingSoonMutation = gql`
	mutation ProviderPreRegister(
		$firstName: String
		$lastName: String
		$email: String!
		$message: String!
		$state: [String!]!
		$licenseType: [String!]!
	) {
		preRegisterProvider(
			providerInput: {
				firstName: $firstName
				lastName: $lastName
				email: $email
				message: $message
				state: $state
				licenseType: $licenseType
			}
		) {
			message
			statusCode
		}
	}
`