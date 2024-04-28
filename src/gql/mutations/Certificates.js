import { gql } from "@apollo/client"

export const addProviderCMECertificateMutation = gql`
	mutation addCMECertificate(
		$certificate: String!
		$comment: String
		$completionDate: String!
		$points: Float!
		$source: Source!
		$rating: Rating
	) {
		addCMECertificate(
			cmeCertificateInput: {
				certificate: $certificate
				comment: $comment
				completionDate: $completionDate
				points: $points
				source: $source
				rating: $rating
			}
		) {
			id
			launchLink
		}
	}
`

export const updateProviderCMECertificateMutation = gql`
	mutation updateCMECertificate($certificateId: Long!, $completionDate: String!, $points: Float!, $rating: Rating) {
		updateCMECertificate(
			updateDetailInput: {
				certificateId: $certificateId
				completionDate: $completionDate
				points: $points
				rating: $rating
			}
		) {
			id
			launchLink
		}
	}
`

export const updateCMECertificateStatusMutation = gql`
	mutation updateCMECertificateStatus($certificateId: Long!, $certificateStatus: CMECertificateStatus) {
		updateCMECertificateStatus(certificateId: $certificateId, certificateStatus: $certificateStatus) {
			statusCode
			message
		}
	}
`

export const deleteCMECertificateMutation = gql`
	mutation deleteCMECertificate($certificateId: Long!) {
		deleteCMECertificate(certificateId: $certificateId) {
			statusCode
			message
		}
	}
`
