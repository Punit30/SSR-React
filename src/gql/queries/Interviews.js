import { gql } from "@apollo/client";

export const getAllInterviewByProviderIdQuery = gql`
	query getAllInterviewByProviderId($providerId: String!) {
		getAllInterviewByProviderId(providerId: $providerId) {
			id
			providerId
			lastModifiedDate
			status
			creationDate
			startTime
			endTime
			attempt
		}
	}
`
