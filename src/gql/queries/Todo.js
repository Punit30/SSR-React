import { gql } from "@apollo/client"

export const getAllTaskByProviderIdQuery = gql`
	query getAllTaskByProviderId($providerId: Long!) {
		getAllTaskByProviderId(providerId: $providerId) {
			task {
				id
				taskName
				description
				redirectionLink
				isActive
				assignedTo
				sequenceNumber
				isOptional
				helperText
			}
			status
		}
	}
`
