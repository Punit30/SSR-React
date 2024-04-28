import { gql } from "@apollo/client"

export const getAllCertificatesByProviderIdQuery = gql`
	query getAllCertificatesByProviderId($providerId: Long!) {
		getAllCertificatesByProviderId(providerId: $providerId) {
			certificateId
			certificateName
			certificateURL
			completionDate
			status
			points
			rating
		}
	}
`

export const getCMECertificateByIdQuery = gql`
	query getCMECertificateById($certificateId: Long!) {
		getCMECertificateById(certificateId: $certificateId) {
			launchLink
			id
		}
	}
`
