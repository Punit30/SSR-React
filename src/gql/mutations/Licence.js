import { gql } from "@apollo/client"

export const updateLicenceStatusMutation = gql`
	mutation updateLicenceStatus($licenceId: String!, $status: LicenceStatus!) {
		updateLicenceStatus(licenceId: $licenceId, status: $status) {
			message
			statusCode
		}
	}
`
